import { CircularProgress } from '@mui/material';
import * as React from 'react';
import { Center } from '../center';

import styles from './page-loader.module.css';

export const PageLoader: React.FC = () => {
	return (
		<Center className={styles.wrapper}>
			<CircularProgress size={80} />
		</Center>
	);
};
