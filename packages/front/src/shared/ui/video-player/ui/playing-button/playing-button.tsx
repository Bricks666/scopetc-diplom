import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { IconButton } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';

import { CommonProps } from '@/shared/types';
import {
	VideoPlayerHandlersContext,
	VideoPlayerStateContext
} from '../../model';
import styles from './playing-button.module.css';

export const PlayingButton: React.FC<CommonProps> = (props) => {
	const { className, } = props;

	const { isPlaying, } = React.useContext(VideoPlayerStateContext);
	const { onPlay, onStop, } = React.useContext(VideoPlayerHandlersContext);

	const onClick = isPlaying ? onStop : onPlay;

	return (
		<IconButton className={cn(styles.button, className)} onClick={onClick}>
			{isPlaying ? (
				<PauseIcon className={styles.icon} />
			) : (
				<PlayArrowIcon className={styles.icon} />
			)}
		</IconButton>
	);
};
