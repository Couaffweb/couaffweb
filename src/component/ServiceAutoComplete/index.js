import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDebounce } from 'hooks';
import { Input } from 'component';
import { searchAllServices } from './apis';
const ServiceAutoComplete = ({ onSelectService }) => {
	const [searchInput, setSearchInput] = useState();
	const [serviceList, setServiceList] = useState([]);
	const [showList, setShowList] = useState(false);
	const debouncedSearchTerm = useDebounce(searchInput, 500);
	useEffect(() => {
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedSearchTerm]);
	const fetchData = () => {
		searchAllServices(searchInput)
			.then(({ data: { result } }) => {
				setShowList(true);
				setServiceList(result);
			})
			.catch(() => {
				setShowList(false);
			});
	};
	return (
		<div className='left_input'>
			<Input
				onBlur={() => {
					setShowList(false);
				}}
				onFoucs={() => {
					setShowList(true);
				}}
				value={searchInput}
				className='one'
				type='text'
				onChange={({ target: { value } }) => setSearchInput(value)}
				placeholder=' Search Services'
			/>
			{showList && setServiceList.length > 0 && (
				<ul className='list-group service-list'>
					{serviceList.map(({ id, name, ...rest }) => (
						<li
							key={id}
							role='button'
							tabIndex='1'
							onClick={() => {
								setSearchInput(name);
								setShowList(false);
								onSelectService({ id, name, ...rest });
							}}
							className='list-group-item'
						>
							{name}
						</li>
					))}
				</ul>
			)}
			<button>
				{' '}
				<i className='fa fa-search' aria-hidden='true'></i>{' '}
			</button>
		</div>
	);
};
ServiceAutoComplete.propTypes = {
	onSelectService: PropTypes.func.isRequired,
};
export default memo(ServiceAutoComplete);
