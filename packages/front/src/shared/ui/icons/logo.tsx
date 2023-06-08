import { SvgIcon } from '@mui/material';
import * as React from 'react';
import { CommonProps } from '@/shared/types';

export const LogoIcon: React.FC<CommonProps> = (props) => {
	const { className, } = props;

	return (
		<SvgIcon className={className} fill='none' viewBox='0 0 180 43'>
			<path
				fill='currentColor'
				d='M59 1.6v39.8c0 .9-.8 1.6-1.7 1.6H47c-.9 0-1.6-.7-1.6-1.6V1.6C45.4.7 46 0 47 0h10.3c1 0 1.6.7 1.6 1.6ZM42.7 41.2l-12-20.7L42 2c.6-.8 0-1.9-1-1.9H28.7c-.4 0-.8.2-1 .6l-8.9 15h-5.2v-14C13.5.7 12.8 0 12 0H1.6C.7 0 0 .7 0 1.6v39.8c0 .9.7 1.6 1.6 1.6h10.3c1 0 1.7-.7 1.7-1.6v-14h6.3l8.8 15c.2.4.6.6 1 .6h12c1 0 1.6-1 1-1.8ZM178.4 43c.9 0 1.6-.7 1.6-1.6V1.6c0-.9-.7-1.6-1.6-1.6h-10c-.9 0-1.6.7-1.6 1.6V22L148.9 0h-11.5c-.9 0-1.6.7-1.6 1.6v39.8c0 .9.7 1.6 1.6 1.6h10c.8 0 1.5-.7 1.5-1.6V21l18 22h11.6ZM131.5 1.8v39.4c0 1-.8 1.8-1.7 1.8h-65c-1 0-1.7-.8-1.7-1.8V1.8c0-1 .8-1.8 1.8-1.8h64.9c1 0 1.7.8 1.7 1.8Zm-13.4 9.6c0-.3-.4-.6-.7-.5-7 1.4-31.9 1.6-40.2 0-.3-.1-.6.2-.6.5V31c0 .4.3.6.6.6 7-1 33.2-.9 40.2 0 .4 0 .7-.2.7-.5V11.4Z'
			/>
		</SvgIcon>
	);
};
