import Forward10Icon from '@mui/icons-material/Forward10';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import Replay10Icon from '@mui/icons-material/Replay10';
import SettingsIcon from '@mui/icons-material/Settings';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { IconButton, Slider } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { useToggle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';

import { VideoPlayerHandlersContext } from '../../model';
import styles from './controls.module.css';

export interface ControlsProps extends CommonProps {
	readonly extraControls?: React.ReactElement | null;
}

export const Controls: React.FC<ControlsProps> = (props) => {
	const { className, extraControls, } = props;
	const { onBack, onForward, onChangeVolume, } = React.useContext(
		VideoPlayerHandlersContext
	);
	const [showSlider, { toggle, }] = useToggle();

	const handlerChangeVolume = (_: unknown, volume: number | number[]) => {
		onChangeVolume(volume as number);
	};

	return (
		<div className={cn(styles.container, className)}>
			<div className={styles.groups}>
				<div>
					<IconButton className={styles.button} onClick={onBack}>
						<Replay10Icon className={styles.icon} />
					</IconButton>
					<IconButton className={styles.button} onClick={onForward}>
						<Forward10Icon className={styles.icon} />
					</IconButton>
				</div>
				<IconButton className={styles.button} onClick={toggle}>
					<VolumeUpIcon className={styles.icon} />
				</IconButton>
				{showSlider && (
					<Slider
						className={styles.slider}
						min={0}
						max={1}
						defaultValue={0.5}
						step={0.01}
						onChange={handlerChangeVolume}
						aria-label='Volume'
					/>
				)}
			</div>
			<div className={styles.groups}>
				{extraControls}
				<IconButton className={styles.button}>
					<SettingsIcon className={styles.icon} />
				</IconButton>
				<IconButton className={styles.button}>
					<FullscreenIcon className={styles.icon} />
				</IconButton>
			</div>
		</div>
	);
};
