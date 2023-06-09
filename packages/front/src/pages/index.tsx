import { CircularProgress } from '@mui/material';
import { createRoutesView } from 'atomic-router-react';
import * as React from 'react';
import { routes } from '@/shared/config';
import { FilmPage } from './film';
import { LoginPage } from './login';

import styles from './index.module.css';

const HomePage = React.lazy(() => import('./home'));

const View = createRoutesView({
	routes: [
		LoginPage,
		{
			route: routes.home,
			view: HomePage,
		},
		FilmPage,
	],
});

export const Pages: React.FC = () => {
	return (
		<React.Suspense
			fallback={
				<CircularProgress
					size={80}
					color='secondary'
					className={styles.circle}
				/>
			}>
			<View />
		</React.Suspense>
	);
};
