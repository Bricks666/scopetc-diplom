import * as React from 'react';
import { Pages } from '@/pages';
import { withProviders } from './providers';

export const App: React.FC = withProviders(() => {
	return <Pages />;
});
