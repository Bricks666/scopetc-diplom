import { Typography, Link as MUILink } from '@mui/material';
import { Link } from 'atomic-router-react';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { FilmsGroup, recommendationsFilmsModel } from '@/widgets/films';
import { Header } from '@/widgets/page';
import { Center, MainLayout } from '@/shared/ui';
import { routes } from '@/shared/config';

import styles from './page.module.css';

const Home: React.FC = () => {
	return (
		<MainLayout className={styles.main} header={<Header />}>
			<Films />
			<Center className={styles.center}>
				<Typography className={styles.text} variant='h5' component='p'>
					Не нашли интересного?
				</Typography>
				<MUILink
					className={styles.link}
					variant='h6'
					color='inherit'
					underline='always'
					to={routes.recommendations}
					component={Link}>
					Подберите рекомендации более точно
				</MUILink>
			</Center>
		</MainLayout>
	);
};

const Films: React.FC = () => {
	const films = useUnit(recommendationsFilmsModel.infinityScroll.$data);

	return (
		<FilmsGroup
			title='Вам может понравиться'
			films={films}
			extraHeader={
				<MUILink
					className={styles.header__link}
					to={routes.recommendations}
					variant='body1'
					component={Link}>
					Смотреть все
				</MUILink>
			}
		/>
	);
};

export default Home;
