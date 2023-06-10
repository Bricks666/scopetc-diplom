import { Typography } from '@mui/material';
import { Link } from 'atomic-router-react';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { FilmsGroup, recommendationsFilmsModel } from '@/widgets/films';
import { Header } from '@/widgets/page';
import { Center, MainLayout } from '@/shared/ui';
import { routes } from '@/shared/config';
import { pageModel } from './model';

import styles from './page.module.css';

pageModel.loaded();

const Home: React.FC = () => {
	return (
		<MainLayout className={styles.main} header={<Header />}>
			<Films />
			<Center className={styles.center}>
				<Typography variant='h5' fontWeight={500} component='p'>
					Не нашли интересного?
				</Typography>
				<Typography variant='h5' to={routes.recommendations} component={Link}>
					Подберите рекомендации более точно
				</Typography>
			</Center>
		</MainLayout>
	);
};

const Films: React.FC = () => {
	const films = useUnit(recommendationsFilmsModel.$data);
	return <FilmsGroup title='Вам может понравиться' films={films} />;
};

export default Home;
