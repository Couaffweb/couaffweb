export const signup = 'user/signup';
export const login = 'user/login';
export const otpVerify = 'user/verify';
export const editProfile = 'user/update';
export const changePassword = 'change-password';
export const forgetPassword = 'forgot-password';
export const logout = 'logout';
export const topRated = 'top-rated';
export const service = 'services';
export const providerDetails = (id) => `massager/services/${id}`;
export const deleteAccount = 'user-delete';
export const bookService = 'service/book';
export const bookings = 'booked/services';
export const bookingActions = 'service/action';
export const ratings = (id = 0) => `rating/${id}`;
export const addImageProvider = 'user/add-image';
export const removeProviderImage = (id) => `user/remove-image/${id}`;
export const getProviderImages = 'user/images';
export const searchService = 'service-search';
export const removeService = (id) => `remove-service/${id}`;
export const editService = (id) => `edit-service/${id}`;
export const searchAllServiceAndProvider = 'near-massager';
export const getAllCategories = 'categories';
export const stripeConnect = 'stripe-connect';
export const stripePaymentToken = 'stripe-token';
export const getAllTransectionList = 'transections';
export const amountTranfer = 'amount-transfer';
export const contactUs = 'contact-us';
export const newLetterEMAIL = 'news-letter';
