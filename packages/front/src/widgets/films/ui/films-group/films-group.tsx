import { Typography } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { TemplateFilmCard } from '@/entities/film';
import { SearchedFilm } from '@/shared/api';
import { CommonProps } from '@/shared/types';

import styles from './films-group.module.css';

export interface FilmsGroupProps extends CommonProps {
	readonly films: SearchedFilm[];
	readonly title?: string;
	readonly extraHeader?: React.ReactElement | null;
}

export const FilmsGroup: React.FC<FilmsGroupProps> = (props) => {
	const { films, title, extraHeader, className, } = props;

	const hasTitle = !!title;
	const hasExtraHeader = !!extraHeader;

	const hasHeader = hasTitle || hasExtraHeader;

	const titleElement = hasTitle ? (
		<Typography className={styles.title} variant='h5' component='h3'>
			{title}
		</Typography>
	) : null;

	const header = hasHeader ? (
		<div className={styles.header}>
			{titleElement}
			{extraHeader}
		</div>
	) : null;

	return (
		<section className={cn(styles.wrapper, className)}>
			{header}
			<div className={styles.list}>
				{films.map((film) => (
					<TemplateFilmCard {...film} key={film.kinopoiskId} />
				))}
			</div>
		</section>
	);
};
