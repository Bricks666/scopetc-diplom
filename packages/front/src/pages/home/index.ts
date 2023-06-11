import * as React from 'react';
import { PageLoader } from '@/shared/ui';
import { pageModel } from './model';

const Page = React.lazy(() => import('./page'));

export const HomePage = {
	view: Page,
	route: pageModel.currentRoute,
	otherwise: PageLoader as React.ComponentType<any>,
};
