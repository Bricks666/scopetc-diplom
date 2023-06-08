import { Typography } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { CommonProps } from '@/shared/types';

import styles from './header.module.css';

export interface HeaderProps extends CommonProps {
	readonly title: string;
}

export const Header: React.FC<HeaderProps> = (props) => {
	const { className, title, } = props;

	return (
		<div className={cn(styles.container, className)}>
			<Typography className={styles.title} variant='h3' component='p'>
				{title}
			</Typography>
		</div>
	);
};
