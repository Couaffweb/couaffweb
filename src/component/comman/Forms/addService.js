import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Image } from 'component';
const AddService = ({
	handleSubmit,
	checkError,
	removeError,
	formError,
	service,
	handleInput,
	handleFile,
	serviceImage,
	isEdit = false,
}) => (
	<Form className='edit_profile1 form-inline' onSubmit={handleSubmit}>
		<div className='edit_profile_data'>
			<div className='form-group log_iocns'>
				<label htmlFor='email'>Service Name:</label>
				<Input
					onBlur={checkError}
					onFocus={removeError}
					isError={formError.name}
					value={service.name}
					placeholder='Name'
					type='text'
					className='form-control'
					name='name'
					onChange={handleInput}
				/>
			</div>

			<div className='form-group log_iocns'>
				<label> Category </label>
				<select
					onBlur={checkError}
					onFocus={removeError}
					isError={formError.category_id}
					defaultValue={service.phone}
					type='number'
					className='form-control'
					name='category_id'
					onChange={handleInput}
				>
					<option value=''>--Please select category--</option>
					<option value='1'>Hair Cute</option>
				</select>
			</div>
			<div className='form-group log_iocns'>
				<label> Price</label>
				<Input
					onBlur={checkError}
					onFocus={removeError}
					isError={formError.price}
					value={service.price}
					placeholder='Price'
					type='number'
					className='form-control'
					name='price'
					onChange={handleInput}
				/>
			</div>
			<div className='form-group log_iocns'>
				<label> Image</label>
				<Input
					onBlur={checkError}
					onFocus={removeError}
					isError={formError.image}
					placeholder='Price'
					type='file'
					className='form-control'
					name='image'
					onChange={handleFile}
				/>
			</div>
			{serviceImage && (
				<div className='form-group'>
					<label> Image Preview</label>
					<Image url={serviceImage} />
				</div>
			)}
			<div className='Explore_all_services'>
				<button type='submit' className='btn btn-primary'>
					{isEdit ? 'Update Service' : 'Add New Service'}
				</button>
			</div>
		</div>
	</Form>
);
AddService.propTypes = {
	isEdit: PropTypes.bool,
	serviceImage: PropTypes.string.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	removeError: PropTypes.func.isRequired,
	checkError: PropTypes.func.isRequired,
	handleFile: PropTypes.func.isRequired,
	handleInput: PropTypes.func.isRequired,
	formError: PropTypes.object.isRequired,
	service: PropTypes.object.isRequired,
};
export default memo(AddService);