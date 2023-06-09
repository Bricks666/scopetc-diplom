import { CircularProgress } from '@mui/material';
import * as React from 'react';

import styles from './page-loader.module.css';

export const PageLoader: React.FC = () => {
	return (
		<div className={styles.wrapper}>
			<CircularProgress size={80} />
		</div>
	);
};
