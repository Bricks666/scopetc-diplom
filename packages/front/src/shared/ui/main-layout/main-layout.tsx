import { Container } from '@mui/material';
import * as React from 'react';
import { CommonProps } from '@/shared/types';

import styles from './main-layout.module.css';

export interface MainLayoutProps extends CommonProps, React.PropsWithChildren {
	readonly header?: null | React.ReactElement;
}

export const MainLayout: React.FC<MainLayoutProps> = (props) => {
	const { className, header, children, } = props;

	return (
		<div className={styles.container}>
			{header}
			<Container className={className} maxWidth='xl'>
				{children}
			</Container>
		</div>
	);
};
