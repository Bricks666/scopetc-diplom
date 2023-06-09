import * as React from 'react';
import { routes } from '@/shared/config';
import { PageLoader } from '@/shared/ui';

const Page = React.lazy(() => import('./page'));

export const HomePage = {
	view: Page,
	route: routes.home,
	otherwise: PageLoader as React.ComponentType<any>,
};
