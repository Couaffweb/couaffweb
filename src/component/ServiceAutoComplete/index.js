import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDebounce } from 'hooks';
import { Input } from 'component';
import { searchAllServices } from './apis';
const ServiceAutoComplete = ({ onSelectService }) => {
	const [searchInput, setSearchInput] = useState();
	const [serviceList, setServiceList] = useState([]);
	const [showList, setShowList] = useState(false);
	const [selectFromList, setSelectFromList] = useState(false);
	const debouncedSearchTerm = useDebounce(searchInput, 500);

	useEffect(() => {
		if (!selectFromList) {
			fetchData();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedSearchTerm]);
	const fetchData = () => {
		searchAllServices(searchInput)
			.then(({ data: { result } }) => {
				setServiceList([...result]);
			})
			.catch(() => {
				setShowList(false);
			});
	};
	const onSelectList = ({ id, name, ...rest }) => {
		setSearchInput(name);
		setShowList(false);
		setSelectFromList(true);
		onSelectService({ id, name, ...rest });
	};
	return (
		<div className='left_input'>
			<Input
				onBlur={() => {
					setTimeout(() => {
						setShowList(false);
					}, 100);
				}}
				onFocus={() => setShowList(true)}
				value={searchInput}
				className='one'
				type='text'
				onChange={({ target: { value } }) => {
					setSelectFromList(false);
					setSearchInput(value);
				}}
				placeholder=' Search Services'
			/>
			{showList && serviceList.length > 0 && (
				<ul className='list-group service-list'>
					{serviceList.map(({ id, name, ...rest }) => (
						<li
							key={id}
							role='button'
							tabIndex='1'
							onClick={() => onSelectList({ id, name, ...rest })}
							className='list-group-item pac-item-query pac-item'
						>
							<i className='pac-icon' aria-hidden='true'></i> {name}
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
