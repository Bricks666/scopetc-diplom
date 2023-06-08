import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IconButton } from '@mui/material';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { Navigation, A11y } from 'swiper';
import { Swiper } from 'swiper/react';
import { FilmSlider } from '@/entities/film';
import { CommonProps } from '@/shared/types';
import { promoFilmsModel } from '../../model';

import styles from './promo-slider.module.css';

export interface PromoSliderProps extends CommonProps {}

export const PromoSlider: React.FC<PromoSliderProps> = (props) => {
	const { className, } = props;

	const films = useUnit(promoFilmsModel.query);

	return (
		<div className={cn(styles.wrapper, className)}>
			<IconButton className={cn(styles.button, styles.button__prev)}>
				<ArrowBackIosNewIcon className={styles.icon} />
			</IconButton>
			<Swiper
				modules={[Navigation, A11y]}
				spaceBetween={50}
				navigation={{
					nextEl: `.${styles.button__next}`,
					prevEl: `.${styles.button__prev}`,
				}}
				loop>
				{films.data.map((film) => (
					<FilmSlider {...film} key={film.id} />
				))}
			</Swiper>
			<IconButton className={cn(styles.button, styles.button__next)}>
				<ArrowForwardIosIcon className={styles.icon} />
			</IconButton>
		</div>
	);
};
