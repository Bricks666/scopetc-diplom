import { SvgIcon } from '@mui/material';
import * as React from 'react';
import { CommonProps } from '@/shared/types';

export const SearchIcon: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	return (
		<SvgIcon className={className} fill='none' viewBox='0 0 16 16'>
			<path
				fill='currentColor'
				d='M6.48.34a6.14 6.14 0 0 1 4.77 10l4.22 4.22a.64.64 0 1 1-.9.9l-4.23-4.21A6.14 6.14 0 1 1 6.47.35Zm0 11a4.86 4.86 0 1 0 0-9.73 4.86 4.86 0 0 0 0 9.73Z'
			/>
		</SvgIcon>
	);
};
