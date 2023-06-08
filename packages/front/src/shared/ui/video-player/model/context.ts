import { createContext, RefObject } from 'react';
import { VoidFunction } from '@/shared/types';

export interface VideoPlayerStateContextParams {
	readonly isPlaying: boolean;
	readonly videoRef: RefObject<HTMLVideoElement>;
	readonly volume: number;
}
export interface VideoPlayerHandlersContextParams {
	readonly onPlay: VoidFunction;
	readonly onStop: VoidFunction;
	readonly onForward: VoidFunction;
	readonly onBack: VoidFunction;
	readonly onChangeVolume: (volume: number) => void;
	readonly onChangeTime: (time: number) => void;
}

export const VideoPlayerStateContext =
	createContext<VideoPlayerStateContextParams>(null as any);

export const VideoPlayerHandlersContext =
	createContext<VideoPlayerHandlersContextParams>(null as any);
