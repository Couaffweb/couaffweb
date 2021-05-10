import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const Paginations = ({
	currentPage,
	className = '',
	onChange,
	totalPage,
	pageRangeDisplayed = 5,
}) => {
	const history = useHistory();
	const lastPage = () => {
		history.push(`?page=${totalPage}`);
		onChange(totalPage);
	};
	const firstPage = () => {
		history.push(`?page=${1}`);
		onChange(1);
	};
	const showPages = () => {
		if (pageRangeDisplayed > totalPage) pageRangeDisplayed = totalPage;
		let start = currentPage - Math.floor(pageRangeDisplayed / 2);
		start = Math.max(start, 1);
		start = Math.min(start, 1 + totalPage - pageRangeDisplayed);
		return Array.from({ length: pageRangeDisplayed }, (el, i) => start + i);
	};
	const previousPage = () => {
		const page = currentPage - 1;
		history.push(`?page=${page}`);
		onChange(page);
	};
	const nextPage = () => {
		const page = currentPage + 1;
		history.push(`?page=${page}`);
		onChange(page);
	};
	const changePage = (page) => {
		history.push(`?page=${page}`);
		onChange(page);
	};
	return (
		<div className={className}>
			{totalPage > 1 && (
				<>
					<nav aria-label='Page navigation example'>
						<ul className='pagination'>
							<li className='page-item'>
								<span
									disabled={currentPage === totalPage}
									className={`page-link ${currentPage === 1 ? 'disabled' : ''}`}
									role='button'
									tabIndex={0}
									onClick={firstPage}
									onKeyPress={firstPage}
								>
									First
								</span>
							</li>
							<li className='page-item'>
								<span
									disabled={currentPage === totalPage}
									className={`page-link ${currentPage === 1 ? 'disabled' : ''}`}
									role='button'
									tabIndex={0}
									onClick={previousPage}
									onKeyPress={previousPage}
								>
									Previous
								</span>
							</li>
							{showPages().map((value) => (
								<li className='page-item' key={value}>
									<span
										key={`page-${value}`}
										role='button'
										tabIndex={0}
										className={` page-link ${
											value === currentPage ? 'active' : ''
										}`}
										onKeyPress={() => changePage(value)}
										onClick={() => changePage(value)}
									>
										{value}
									</span>
								</li>
							))}
							<li className='page-item'>
								<span
									role='button'
									className={`page-link ${
										currentPage === totalPage ? 'disabled' : ''
									}`}
									disabled={currentPage === totalPage}
									tabIndex={0}
									onClick={nextPage}
									onKeyPress={nextPage}
								>
									Next
								</span>
							</li>
							<li className='page-item'>
								<span
									role='button'
									className={`page-link ${
										currentPage === totalPage ? 'disabled' : ''
									}`}
									disabled={currentPage === totalPage}
									tabIndex={0}
									onClick={lastPage}
									onKeyPress={lastPage}
								>
									Last
								</span>
							</li>
						</ul>
					</nav>
				</>
			)}
		</div>
	);
};

Paginations.propTypes = {
	currentPage: PropTypes.number.isRequired,
	className: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	pageRangeDisplayed: PropTypes.number,
	totalPage: PropTypes.number.isRequired,
};

export default memo(Paginations);
