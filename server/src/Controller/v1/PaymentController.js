require('dotenv').config();
const ApiError = require('../../Exceptions/ApiError');
const stripKey =
	process.env.STRIP_KEY ||
	'sk_test_51IpQS6AplERnGLwpukZb5qQfEUL0jBUpHiHnH4n5ygyS1f72mSzS1SEsxulGeMIApMOpFWQvNZXWACYWez9Bu8BB006hmYtzRX';
const stripe = require('stripe')(stripKey);
const Db = require('../../../libary/sqlBulider');
const ApiController = require('./ApiController');
const DB = new Db();
const helper = new ApiController();
module.exports = {
	createAccount: async (user_id, email, bankAccountDetails = null) => {
		stripe.account.create(
			{
				type: 'custom',
				country: 'US',
				email: email,
				business_type: 'individual',
				requested_capabilities: ['card_payments', 'transfers'],
			},
			function (err, account) {
				if (err) {
					DB.save('strips_fail_logs', {
						user_id,
						informations: JSON.stringify(err),
					});
				} else {
					DB.save('users', {
						id: user_id,
						strip_id: account.id,
						strip_info: JSON.stringify(account),
					});
					if (bankAccountDetails) {
						createBankAccount(
							account.id,
							JSON.parse(bankAccountDetails),
							user_id
						);
					}
				}
			}
		);
	},
	payoutBalance: async (amount, stripeAccount, userID) => {
		try {
			const result = await stripe.payouts.create(
				{
					amount: amount,
					currency: 'usd',
					method: 'instant',
				},
				{ stripeAccount }
			);
			return result;
		} catch (err) {
			DB.save('strips_fail_logs', {
				informations: JSON.stringify(err),
				user_id: userID,
				type: 1,
			});
			return false;
		}
	},
	stripeHook: async (Request, Response) => {
		const {
			query,
			query: { stripe_id },
			body,
			params: { user_id },
		} = Request;
		if (query.type === 'success') {
			const accountInfo = await stripe.accounts.retrieve(stripe_id);
			const {
				capabilities: { card_payments, transfers },
			} = accountInfo;
			if (card_payments === 'active' && transfers === 'active') {
				await DB.save('users', {
					id: user_id,
					stripe_connect: 1,
				});
			}
			// apis.sendPush(user_id, {
			// 	message:
			// 		'Your account successfully link with stripe now you will add your product',
			// 	data: [],
			// 	notification_code: 10,
			// });
			return Response.render('AddBankDetails', { user_id });
		}
		await DB.save('strips_fail_logs', {
			informations: JSON.stringify({ query, body }),
			user_id: user_id,
			type: 5, // strinp hook log
		});
		return Response.render('error', {
			message: 'Something went wrong try later',
			error: {
				status: 400,
			},
		});
	},
	stripeAccountActive: async (Request) => {
		const { stripe_id, id } = Request.body.userInfo;
		const accountInfo = await stripe.accounts.retrieve(stripe_id);
		const {
			capabilities: { card_payments, platform_payments },
		} = accountInfo;
		let account = false;
		if (card_payments === 'active' && platform_payments === 'active') {
			await DB.save('users', {
				id,
				stripe_connect: true,
			});
			account = true;
		}
		return {
			message: 'Account info',
			data: {
				account,
				accountInfo,
			},
		};
	},
	stripeAccountLink: async (Request) => {
		const {
			strip_id,
			user_id,
			userInfo: { stripe_id = '' },
		} = Request.body;
		if (!strip_id)
			throw new ApiError(
				'Your have not register in the stripe. First create a strip account',
				400
			);
		try {
			const Links = await new Promise((Resolve, Reject) => {
				stripe.accountLinks.create(
					{
						account: stripe_id,
						failure_url: `${global.appURL}apis/v1/stripe-integration/${user_id}?type=fail&stripe_id=${stripe_id}`,
						success_url: `${global.appURL}apis/v1/stripe-integration/${user_id}?type=success&stripe_id=${stripe_id}`,
						type: 'custom_account_verification',
					},
					function (err, accountLink) {
						if (err) Reject(err);
						Resolve(accountLink);
					}
				);
			});
			return {
				message: 'Account link url',
				data: Links,
			};
		} catch (error) {
			throw new ApiError(error);
		}
	},
	connectStripeWeb: async ({ body: { code, user_id } }) => {
		const result = await stripe.oauth.token({
			grant_type: 'authorization_code',
			code,
		});
		if (result.stripe_user_id) {
			await DB.save('users', {
				id: user_id,
				stripe_id: result.stripe_user_id,
				stripe_connect: true,
			});
		}
		return {
			message: 'Connceted successfully',
			data: await helper.userDetails(user_id, true),
		};
	},
	oauthConnect: async (Request) => {
		const { code, state } = Request.query;
		const result = await stripe.oauth.token({
			grant_type: 'authorization_code',
			code,
		});
		if (result.stripe_user_id) {
			await DB.save('users', {
				id: state,
				stripe_id: result.stripe_user_id,
			});
		}
		return {
			message: 'Connceted successfully',
			stripe_id: result.stripe_user_id,
		};
	},
	createStripeSecert: async ({
		body: {
			amount = 0,
			order_id,
			shop_stripe_id,
			application_fee_amount = 10,
			currency = 'usd',
		},
	}) => {
		if (amount === 0) throw new ApiError('Amount field is required', 400);
		try {
			const paymentIntent = await stripe.paymentIntents.create({
				amount,
				currency,
				transfer_group: order_id,
				// application_fee_amount, // comment for dissble the time
				// transfer_data: {
				// 	destination: shop_stripe_id,
				// },
			});
			const clientSecret = paymentIntent.client_secret;
			return {
				message: 'Stripe Secert Key',
				data: {
					secret: clientSecret,
				},
			};
		} catch (err) {
			throw new ApiError(err);
		}
	},
	getStripBalance: async (stripe_account) => {
		try {
			return await stripe.balance.retrieve({
				stripe_account,
			});
		} catch (err) {
			return false;
		}
	},
	getTransection: async ({
		body: {
			user_id,
			userInfo: { walletAmount = 0 },
		},
		query: { page = 1, limit = 20, search = '' },
	}) => {
		const offset = (page - 1) * limit;
		const condition = {
			conditions: {
				userId: user_id,
			},
			orderBy: ['id desc'],
			limit: [offset, limit],
		};
		if (search) {
			Object.assign(condition.conditions, {
				raw: [` bookingId like '%${search}% or amount like '%${search}%'`],
			});
		}
		const allTransection = await DB.find('transactions', 'all', condition);
		const pagination = await helper.Paginations(
			'transactions',
			condition,
			page,
			limit
		);
		return {
			message: 'Transection list',
			data: {
				walletAmount,
				pagination,
				allTransection,
			},
		};
	},
	donePayment: async ({
		body: { bookingId, user_id, paymentDetails, paymentStatus },
	}) => {
		const bookingInfo = await DB.find('bookServices', 'first', {
			conditions: {
				id: bookingId,
				userId: user_id,
			},
		});
		if (!bookingInfo) throw new ApiError('Invaild booking id', 422);
		if ([1, 2].indexOf(parseInt(paymentStatus)) === -1)
			throw new ApiError('Invaild paymentStatus id', 422);
		await DB.save('bookServices', {
			paymentDetails: JSON.stringify(paymentDetails),
			paymentStatus,
			id: bookingId,
		});
		setTimeout(() => {
			// send push there
			helper.sendPush(
				bookingInfo.massagerId,
				{
					notification_code: 5,
					bookingInfo,
				},
				'Payment done by user'
			);
		}, 100);
		return {
			message: 'Payment done',
			data: bookingInfo,
		};
	},
	updateBank: async ({
		bankDetails,
		strip_id,
		stripe_bank_account_id,
		userID,
	}) => {
		try {
			await createBankAccount(strip_id, bankDetails, userID);
			if (stripe_bank_account_id) {
				await new Promise((Resolve, Reject) => {
					stripe.accounts.deleteExternalAccount(
						strip_id,
						stripe_bank_account_id,
						function (err, confirmation) {
							if (err) {
								Reject(err);
							} else {
								Resolve(confirmation);
							}
						}
					);
				});
			}
			return true;
		} catch (err) {
			throw new ApiError(err, 400);
		}
	},
	providerAmountTransfer: async ({
		body: {
			user_id,
			userInfo: { stripe_id, walletAmount },
		},
	}) => {
		if (!stripe_id)
			throw new ApiError('Your account is not connected with stripe');
		if (walletAmount < 10)
			throw new ApiError(`You haven't insufficient balance withdraw`);
		const transfer = await stripe.transfers.create({
			amount: parseInt(walletAmount) * 100,
			currency: 'usd',
			destination: stripe_id,
			description: 'Withdrawal amount',
		});
		const transectionDetails = {
			amount: walletAmount,
			userId: user_id,
			transactionType: 1,
			bookingId: 0,
			totalBalance: 0,
			transactionInfo: JSON.stringify(transfer),
		};
		transectionDetails.id = await DB.save('transactions', transectionDetails);
		await DB.save('users', {
			id: user_id,
			walletAmount: 0,
		});
		return {
			message: 'Amount transfer successfully',
			data: transectionDetails,
		};
	},
	transfersAmount: ({
		destination,
		amount,
		order_id,
		order_date,
		shop_id,
		user_type,
		application_fee_amount = 10,
	}) => {
		return new Promise((Resolved, Reject) => {
			stripe.transfers.create(
				{
					amount,
					currency: 'usd',
					destination,
					transfer_group: order_date,
				},
				function async(err, transfer) {
					if (err) {
						DB.save('strips_fail_logs', {
							informations: JSON.stringify(err),
							user_id: shop_id,
							type: 6,
						});
						Reject(err);
					} else {
						DB.save('amount_transfers', {
							user_id: shop_id,
							user_type,
							checkout_status: 1,
							order_id,
							amount: amount - application_fee_amount,
						});
						Resolved(transfer);
					}
				}
			);
		});
	},
};
const createBankAccount = async (stripID, bankAccountDetails, userID) => {
	const bank_account = {
		country: 'US',
		currency: 'usd',
		account_holder_type: 'individual',
		...bankAccountDetails,
	};
	return new Promise((Resolve, reject) => {
		stripe.tokens.create(
			{
				bank_account,
			},
			function (err, token) {
				if (err) {
					DB.save('strips_fail_logs', {
						informations: JSON.stringify(err),
						user_id: userID,
						type: 3,
					});
					reject(err);
				} else {
					stripe.accounts.createExternalAccount(
						stripID,
						{ external_account: token.id },
						function (err, bank_account) {
							if (err) {
								DB.save('strips_fail_logs', {
									informations: JSON.stringify(err),
									user_id: userID,
									type: 1,
								});
								reject(err);
							} else {
								DB.save('users', {
									id: userID,
									stripe_bank_account_id: bank_account.id,
									bank_account: JSON.stringify(bank_account),
								});
								Resolve(true);
							}
						}
					);
				}
			}
		);
	});
};
