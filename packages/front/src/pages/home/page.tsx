import { useUnit } from 'effector-react';
import * as React from 'react';
import { FilmsGroup, promoFilmsModel, PromoSlider } from '@/widgets/films';
import { Header } from '@/widgets/page';
import { MainLayout } from '@/shared/ui';
import { pageModel } from './model';

import styles from './page.module.css';

const Home: React.FC = () => {
	const films = useUnit(promoFilmsModel.query);
	/*
  Докинуть нормальные данные, чтобы правильно рендерить группы
  */

	return (
		<MainLayout header={<Header />}>
			<PromoSlider className={styles.promo} />
			<article className={styles.groups}>
				<FilmsGroup title='Промофильмы' films={films.data} />
				<FilmsGroup title='Промофильмы' films={films.data} />
				<FilmsGroup title='Промофильмы' films={films.data} />
			</article>
		</MainLayout>
	);
};

pageModel.loaded();

export default Home;
