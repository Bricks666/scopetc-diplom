import { useUnit } from 'effector-react';
import * as React from 'react';
import { FilmsGroup, recommendationsFilmsModel } from '@/widgets/films';
import { Header } from '@/widgets/page';
import { MainLayout } from '@/shared/ui';
import { pageModel } from './model';

const Home: React.FC = () => {
	const films = useUnit(recommendationsFilmsModel.query);
	/*
  Докинуть нормальные данные, чтобы правильно рендерить группы
  */

	return (
		<MainLayout header={<Header />}>
			<FilmsGroup title='Рекомендации' films={films.data} />
		</MainLayout>
	);
};

pageModel.loaded();

export default Home;
