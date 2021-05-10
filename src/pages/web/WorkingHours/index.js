import React, { memo, useState } from 'react';
import { ReactLoading } from 'component';
const WorkingHours = () => {
	const [loading, setLoading] = useState(false);
	return (
		<div classNameName='container container-all'>
			<ReactLoading isShow={loading} />
			<div classNameName='row'>
				<div classNameName='col-lg-8'>
					<div className='card'>
						<div className='card-body'>
							<h1 className='d-flex justify-content-center'>Working Hours</h1>
							<hr className='line' />
							<div className='row'></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default memo(WorkingHours);
