import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StarIcon from '@mui/icons-material/Star';
import { Typography } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { SearchedFilm } from '@/shared/api';
import { CommonProps } from '@/shared/types';

import styles from './template-film-card.module.css';
import { concatGenres } from '../../lib';

export interface TemplateFilmCardProps extends CommonProps, SearchedFilm {}

export const TemplateFilmCard: React.FC<TemplateFilmCardProps> = (props) => {
	const {
		nameRu,
		nameEn,
		nameOriginal,
		posterUrlPreview,
		genres,
		ratingKinopoisk,
		className,
	} = props;

	const title = nameRu || nameEn || nameOriginal || 'Безымянный фильм';

	const genre = concatGenres(genres);

	return (
		<div className={cn(styles.card, className)}>
			<img className={styles.image} src={posterUrlPreview} alt={title} />
			<div>
				<Typography variant='h5' component='h4'>
					{title}
				</Typography>
				<Typography>{genre}</Typography>
				<div className={styles.bottom}>
					<Typography className={styles.rating} variant='h6' component='p'>
						<StarIcon className={styles.icon} />
						{ratingKinopoisk}
					</Typography>
					<PlayArrowIcon className={styles.icon} />
				</div>
			</div>
		</div>
	);
};
