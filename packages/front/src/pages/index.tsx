import { createRoutesView } from 'atomic-router-react';
import * as React from 'react';
import { PageLoader } from '@/shared/ui';
import { HomePage } from './home';
import { LoginPage } from './login';
import { RegistrationPage } from './registration';

const View = createRoutesView({
	routes: [LoginPage, HomePage, RegistrationPage],
});

export const Pages: React.FC = () => {
	return (
		<React.Suspense fallback={<PageLoader />}>
			<View />
		</React.Suspense>
	);
};
