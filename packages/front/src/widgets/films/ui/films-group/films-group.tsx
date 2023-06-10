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
}

export const FilmsGroup: React.FC<FilmsGroupProps> = (props) => {
	const { films, title, className, } = props;

	const header = title ? (
		<Typography className={styles.title} variant='h4' component='h3'>
			{title}
		</Typography>
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
