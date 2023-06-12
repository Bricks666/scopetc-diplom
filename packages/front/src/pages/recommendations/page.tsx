import { CircularProgress } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { FilmsGroup, recommendationsFilmsModel } from '@/widgets/films';
import { Header } from '@/widgets/page';
import { Center, MainLayout } from '@/shared/ui';
import { useIntersection } from '@/shared/lib';
import { SearchFilmFilters } from '@/features/films';

import styles from './page.module.css';

const Recommendations: React.FC = () => {
	return (
		<MainLayout className={styles.main} header={<Header />}>
			<SearchFilmFilters />
			<Films />
			<FilmsLoading />
			<IntersectionDetector />
		</MainLayout>
	);
};

const Films: React.FC = () => {
	const films = useUnit(recommendationsFilmsModel.infinityScroll.$data);
	return <FilmsGroup films={films} />;
};

const FilmsLoading: React.FC = () => {
	const loading = useUnit(recommendationsFilmsModel.infinityScroll.$pending);
	if (loading) {
		return (
			<Center>
				<CircularProgress color='warning' size={50} />
			</Center>
		);
	}
	return null;
};

const IntersectionDetector: React.FC = () => {
	const ref = React.useRef<HTMLDivElement | null>(null);

	const fetchNext = useUnit(recommendationsFilmsModel.infinityScroll.next);
	const isInitial = useUnit(recommendationsFilmsModel.infinityScroll.$initial);

	const intersectionEntry = useIntersection({
		containerRef: ref,
		rootMargin: '300px',
	});

	React.useEffect(() => {
		if (intersectionEntry?.isIntersecting && !isInitial) {
			fetchNext();
		}
	}, [intersectionEntry?.isIntersecting, isInitial]);

	return <div ref={ref} />;
};

export default Recommendations;
