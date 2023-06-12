import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StarIcon from '@mui/icons-material/Star';
import {
	Card,
	CardContent,
	CardHeader,
	CardMedia,
	IconButton,
	Typography
} from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { SearchedFilm } from '@/shared/api';
import { CommonProps } from '@/shared/types';
import { concatGenres } from '../../lib';

import styles from './template-film-card.module.css';

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
		<Card className={cn(styles.card, className)} variant='outlined'>
			<CardMedia
				className={styles.image}
				src={posterUrlPreview}
				alt={title}
				component='img'
			/>
			<CardHeader
				className={styles.header}
				title={title}
				classes={{
					content: styles.header__content,
				}}
				titleTypographyProps={{
					className: styles.title,
					variant: 'subtitle1',
					component: 'p',
					title,
				}}
				subheader={genre}
				subheaderTypographyProps={{
					className: styles.subtitle,
					variant: 'subtitle2',
					component: 'p',
					title: genre,
				}}
			/>
			<CardContent className={styles.content}>
				<Typography className={styles.rating} variant='body1' component='p'>
					<StarIcon />
					{ratingKinopoisk}
				</Typography>
				<IconButton>
					<PlayArrowIcon />
				</IconButton>
			</CardContent>
		</Card>
	);
};
