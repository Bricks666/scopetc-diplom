import { Typography } from '@mui/material';
import { Link } from 'atomic-router-react';
import cn from 'classnames';
import * as React from 'react';
import { SwiperSlide } from 'swiper/react';
import { Film } from '@/shared/api';
import { routes } from '@/shared/config';
import { CommonProps } from '@/shared/types';

import styles from './film-slide.module.css';

export interface FilmSliderProps extends CommonProps, Film {}

export const FilmSlider: React.FC<FilmSliderProps> = (props) => {
	const { description, id, title, preview: urlPreview, className, } = props;

	return (
		<SwiperSlide className={cn(styles.slide, className)}>
			<Link className={styles.link} to={routes.film} params={{ id, }}>
				<img className={styles.preview} src={urlPreview} alt={title} />
				<div className={styles.textWrapper}>
					<Typography className={styles.title} variant='h3'>
						{title}
					</Typography>
					<Typography className={styles.description} variant='h5' component='p'>
						{description}
					</Typography>
					<Typography className={styles.info} variant='h5' component='p'>
						2018 * Мелодрама, Комедия{' '}
						<Typography
							className={styles.age}
							variant='inherit'
							component='span'>
							18+
						</Typography>
					</Typography>
				</div>
			</Link>
		</SwiperSlide>
	);
};

FilmSlider.displayName = SwiperSlide.displayName;
