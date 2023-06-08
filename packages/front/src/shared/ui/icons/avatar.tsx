import { SvgIcon } from '@mui/material';
import * as React from 'react';
import { CommonProps } from '@/shared/types';

export const AvatarIcon: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	return (
		<SvgIcon className={className} fill='none' viewBox='0 0 34 34'>
			<path
				fill='currentColor'
				strokeWidth={16}
				d='M17 16.2a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0-14.4a6.4 6.4 0 1 1 0 12.8 6.4 6.4 0 0 1 0-12.8ZM18.7 17.8h-3.4A15.2 15.2 0 0 0 .2 33a.8.8 0 0 0 .8.8h32a.9.9 0 0 0 .8-.9 15.1 15.1 0 0 0-15.1-15.1ZM1.8 32.2a13.5 13.5 0 0 1 13.5-12.8h3.4a13.5 13.5 0 0 1 13.5 12.8H1.8Z'
			/>
		</SvgIcon>
	);
};
