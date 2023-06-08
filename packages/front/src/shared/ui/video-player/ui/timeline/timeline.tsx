import { Typography } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { VideoSeekSlider } from 'react-video-seek-slider';
import { CommonProps } from '@/shared/types';
import { parseTime } from '../../lib';
import {
	VideoPlayerStateContext,
	VideoPlayerHandlersContext,
} from '../../model';

import styles from './timeline.module.css';
import 'react-video-seek-slider/styles.css';

export interface TimelineProps extends CommonProps {}

export const Timeline: React.FC<TimelineProps> = (props) => {
	const { className } = props;
	const { videoRef } = React.useContext(VideoPlayerStateContext);
	const { onChangeTime } = React.useContext(VideoPlayerHandlersContext);

	const { duration, currentTime } = videoRef.current! || {
		duration: 0,
		currentTime: 0,
	};
	const currentTimeParsed = parseTime(currentTime);
	const durationParsed = parseTime(duration);

	return (
		<div className={cn(className, styles.connect)}>
			<VideoSeekSlider
				max={duration * 1000}
				currentTime={currentTime * 1000}
				onChange={onChangeTime}
				secondsPrefix='00:00:'
				minutesPrefix='00:'
			/>
			<div>
				<Typography
					className={cn(styles.time, styles.progressTime)}
					variant='body2'
					component='span'>
					{currentTimeParsed !== '' ? currentTimeParsed : '00:00:00'}/
				</Typography>
				<Typography
					className={cn(styles.time, styles.allTime)}
					variant='body2'
					component='span'>
					{durationParsed !== '' ? durationParsed : '00:00:00'}
				</Typography>
			</div>
		</div>
	);
};
