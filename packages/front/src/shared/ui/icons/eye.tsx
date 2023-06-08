import { SvgIcon } from '@mui/material';
import * as React from 'react';
import { CommonProps } from '@/shared/types';

export const EyeIcon: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	return (
		<SvgIcon className={className} fill='none' viewBox='0 0 46 28'>
			<path
				fill='currentColor'
				d='M23 0C14.2 0 6.2 4.8.4 12.6c-.5.7-.5 1.6 0 2.2A28.7 28.7 0 0 0 23 27.4c8.8 0 16.8-4.8 22.6-12.6.5-.6.5-1.5 0-2.2A28.7 28.7 0 0 0 23 0Zm.6 23.4A9.7 9.7 0 1 1 22.4 4a9.7 9.7 0 0 1 1.2 19.4Zm-.3-4.5a5.2 5.2 0 1 1-.6-10.4 5.2 5.2 0 1 1 .6 10.4Z'
			/>
		</SvgIcon>
	);
};
