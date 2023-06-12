import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardDownUpIcon from '@mui/icons-material/KeyboardArrowDown';
import ClearIcon from '@mui/icons-material/Clear';
import {
	Button,
	CircularProgress,
	Collapse,
	IconButton,
	Tooltip,
	Typography
} from '@mui/material';
import { useStoreMap, useUnit } from 'effector-react';
import * as React from 'react';
import { FilmsGroup, recommendationsFilmsModel } from '@/widgets/films';
import { Header } from '@/widgets/page';
import { Center, MainLayout } from '@/shared/ui';
import { useIntersection, useToggle } from '@/shared/lib';
import { SearchFilmFilters, searchFilmFiltersModel } from '@/features/films';

import styles from './page.module.css';

const Recommendations: React.FC = () => {
	return (
		<MainLayout className={styles.main} header={<Header />}>
			<div className={styles.header}>
				<Typography className={styles.title} variant='h4' component='h2'>
					Подберем фильм специально для вас!
				</Typography>
				<Filters />
			</div>
			<FilmsEmptyLabel />
			<FilmsResult />
			<FilmsLoading />
			<IntersectionDetector />
		</MainLayout>
	);
};

const Filters: React.FC = () => {
	const [opened, handlers] = useToggle(true);
	const isDirty = useUnit(searchFilmFiltersModel.form.$isDirty);
	const reset = useUnit(searchFilmFiltersModel.form.resetValues);

	const Icon = opened ? KeyboardDownUpIcon : KeyboardArrowUpIcon;

	return (
		<>
			<div className={styles.filters__controls}>
				{isDirty ? (
					<Tooltip title='Сбросить фильтры'>
						<IconButton onClick={reset}>
							<ClearIcon />
						</IconButton>
					</Tooltip>
				) : null}
				<Button onClick={handlers.toggle} endIcon={<Icon />}>
					Фильтры
				</Button>
			</div>
			<Collapse className={styles.filters} in={opened}>
				<SearchFilmFilters />
			</Collapse>
		</>
	);
};

const FilmsResult: React.FC = () => {
	const films = useUnit(recommendationsFilmsModel.infinityScroll.$data);

	if (!films.length) {
		return null;
	}

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

const FilmsEmptyLabel: React.FC = () => {
	const loading = useUnit(recommendationsFilmsModel.infinityScroll.$pending);
	const empty = useStoreMap({
		store: recommendationsFilmsModel.infinityScroll.$data,
		keys: [],
		fn: (data) => !data.length,
		defaultValue: false,
	});

	if (!loading && empty) {
		return (
			<Center>
				<Typography>По вашему запросу ничего не найдено</Typography>
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
