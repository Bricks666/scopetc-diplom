import cn from 'classnames';
import * as React from 'react';
import { CommonProps } from '@/shared/types';
import { VideoPlayerProvider, VideoPlayerProviderProps } from '../../model';

import styles from './root.module.css';

export interface RootProps extends CommonProps, VideoPlayerProviderProps {}

export const Root: React.FC<RootProps> = (props) => {
	const { children, className, ...rest } = props;
	return (
		<VideoPlayerProvider {...rest}>
			<div className={cn(styles.container, className)}>{children}</div>
		</VideoPlayerProvider>
	);
};
