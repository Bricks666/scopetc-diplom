import { Typography } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { TemplateFilmCard } from '@/entities/film';
import { Film } from '@/shared/api';
import { CommonProps } from '@/shared/types';

import styles from './films-group.module.css';

export interface FilmsGroupProps extends CommonProps {
	readonly films: Film[];
	readonly title: string;
}

export const FilmsGroup: React.FC<FilmsGroupProps> = (props) => {
	const { films, title, className, } = props;

	return (
		<section className={cn(styles.wrapper, className)}>
			<Typography className={styles.title} variant='h4' component='h3'>
				{title}
			</Typography>
			<div className={styles.list}>
				{films.map((film) => (
					<TemplateFilmCard {...film} key={film.id} />
				))}
			</div>
		</section>
	);
};
