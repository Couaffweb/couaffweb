import React, { memo } from 'react';
import { Input } from 'component';

const AddService = () => {
	return (
		<div className='container'>
			<div className='row'>
				<div className='col-lg-12'>
					<Input />
				</div>
			</div>
		</div>
	);
};

export default memo(AddService);
