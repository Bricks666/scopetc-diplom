import { createRouteView } from 'atomic-router-react';
import * as React from 'react';
import { PageLoader } from '@/shared/ui';
import { pageModel } from './model';

const Page = React.lazy(() => import('./page'));

export const LoginPage = {
	route: pageModel.currentRoute,
	view: createRouteView({
		route: pageModel.anonymousRoute,
		view: Page as React.ComponentType<any>,
		otherwise: PageLoader as React.ComponentType<any>,
	}),
};
