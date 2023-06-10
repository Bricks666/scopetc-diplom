import { CircularProgress } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { FilmsGroup, recommendationsFilmsModel } from '@/widgets/films';
import { Header } from '@/widgets/page';
import { Center, MainLayout } from '@/shared/ui';

import styles from './page.module.css';
import { useIntersection } from '@/shared/lib';

const Recommendations: React.FC = () => {
	return (
		<MainLayout className={styles.main} header={<Header />}>
			<Films />
			<FilmsLoading />
			<IntersectionDetector />
		</MainLayout>
	);
};

const Films: React.FC = () => {
	const films = useUnit(recommendationsFilmsModel.$data);
	return <FilmsGroup title='' films={films} />;
};

const FilmsLoading: React.FC = () => {
	const loading = useUnit(recommendationsFilmsModel.$pending);
	if (loading) {
		return (
			<Center>
				<CircularProgress color='secondary' size={50} />
			</Center>
		);
	}
	return null;
};

const IntersectionDetector: React.FC = () => {
	const ref = React.useRef<HTMLDivElement | null>(null);

	const fetch = useUnit(recommendationsFilmsModel.start);

	const intersectionEntry = useIntersection({
		containerRef: ref,
		rootMargin: '100px',
	});

	React.useEffect(() => {
		if (intersectionEntry?.isIntersecting) {
			fetch();
		}
	}, [intersectionEntry?.isIntersecting]);

	return <div ref={ref} />;
};

export default Recommendations;
