import { useUnit } from 'effector-react';
import * as React from 'react';
import { Film } from '@/shared/api';
import { CommonProps } from '@/shared/types';
import { VideoPlayer } from '@/shared/ui';
import { activePresetModel } from '../../model';
import { FilmExtraControls } from '../film-extra-controls';

export interface FilmPlayerProps extends CommonProps, Film {}

export const FilmPlayer: React.FC<FilmPlayerProps> = (props) => {
	const { className, title, manifest, } = props;

	const {
		brightness,
		contrast,
		saturation,
		red,
		green,
		blue,
		enableCustomGamma,
	} = useUnit(activePresetModel.$activePreset);

	const videoStyles: React.CSSProperties = {
		filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation})`,
	};

	return (
		<VideoPlayer
			className={className}
			url={manifest}
			title={title}
			videoStyles={videoStyles}
			red={red}
			green={green}
			blue={blue}
			enableCustomGamma={enableCustomGamma}
			extraControls={<FilmExtraControls />}
		/>
	);
};
