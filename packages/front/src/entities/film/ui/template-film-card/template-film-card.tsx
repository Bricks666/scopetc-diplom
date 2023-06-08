import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StarIcon from '@mui/icons-material/Star';
import { IconButton, Typography } from '@mui/material';
import { RouteInstance } from 'atomic-router';
import { Link } from 'atomic-router-react';
import cn from 'classnames';
import * as React from 'react';
import { Film } from '@/shared/api';
import { routes } from '@/shared/config';
import { CommonProps } from '@/shared/types';

import styles from './template-film-card.module.css';

export interface TemplateFilmCardProps extends CommonProps, Film {}

export const TemplateFilmCard: React.FC<TemplateFilmCardProps> = (props) => {
	const { id, title, preview: urlPreview, className, } = props;
	return (
		<div className={cn(styles.card, className)}>
			<Link className={styles.link} to={routes.film} params={{ id, }}>
				<img className={styles.image} src={urlPreview} alt={title} />
			</Link>
			<Typography variant='h5' component='h4'>
				<Link className={styles.link} to={routes.film} params={{ id, }}>
					{title}
				</Link>
			</Typography>
			<div className={styles.bottom}>
				<Typography className={styles.rating} variant='h6' component='p'>
					<IconButton className={styles.button}>
						<StarIcon className={styles.icon} />
					</IconButton>
					8.1
				</Typography>
				<IconButton
					className={styles.button}
					to={routes.film as RouteInstance<any>}
					params={{ id, }}
					component={Link}>
					<PlayArrowIcon className={styles.icon} />
				</IconButton>
			</div>
		</div>
	);
};
