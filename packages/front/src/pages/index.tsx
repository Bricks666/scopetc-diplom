import { createRoutesView } from 'atomic-router-react';
import * as React from 'react';
import { PageLoader } from '@/shared/ui';
import { FilmPage } from './film';
import { HomePage } from './home';
import { LoginPage } from './login';
import { RegistrationPage } from './registration';

const View = createRoutesView({
	routes: [LoginPage, HomePage, FilmPage, RegistrationPage],
});

export const Pages: React.FC = () => {
	return (
		<React.Suspense fallback={<PageLoader />}>
			<View />
		</React.Suspense>
	);
};
