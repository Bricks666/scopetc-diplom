import { Element, Renderer, Color } from 'p5';
import * as React from 'react';
import { P5CanvasInstance } from 'react-p5-wrapper';

export interface UseSketchParams {
	readonly ref: React.ForwardedRef<HTMLVideoElement>;
	readonly red: number;
	readonly green: number;
	readonly blue: number;
	readonly enableCustomGamma: boolean;
}

export const useSketch = (params: UseSketchParams) => {
	const { ref, red, green, blue, enableCustomGamma, } = params;

	const canvasRef = React.useRef<null | Renderer>(null);
	const videoRef = React.useRef<null | Element>(null);
	const colorRef = React.useRef(null as unknown as Color);

	const sketch = React.useCallback((p5: P5CanvasInstance) => {
		p5.setup = () => {
			colorRef.current = p5.color(red, green, blue);
			if (canvasRef.current) {
				return;
			}
			canvasRef.current = p5.createCanvas(
				window.innerWidth,
				window.innerHeight
			);
			if (videoRef.current) {
				return;
			}

			videoRef.current = p5.createCapture('video');
			const { width, height, } = canvasRef.current.size() as any;
			videoRef.current.size(width, height);

			switch (typeof ref) {
				case 'undefined':
					break;
				case 'object':
					if (ref !== null) {
						ref.current = videoRef.current.elt as HTMLVideoElement;
					}
					break;
				case 'function':
					ref(videoRef.current.elt);
					break;
				default:
					break;
			}

			(videoRef.current.elt as HTMLVideoElement).playsInline = false;
			(videoRef.current.elt as HTMLVideoElement).autoplay = false;
			(videoRef.current.elt as HTMLVideoElement).pause();

			videoRef.current.hide();
			// videoRef.current.elt.src = '/video.mp4';
			videoRef.current.elt.volume = 0.1;
			videoRef.current.removeAttribute('playsinline');
		};

		p5.draw = () => {
			if (!videoRef.current || !videoRef.current.elt.src) {
				return;
			}
			p5.tint(colorRef.current);
			p5.image(videoRef.current, 0, 0);
		};

		p5.windowResized = () => {
			p5.resizeCanvas(window.innerWidth, window.innerHeight, true);
			videoRef.current!.size(window.innerWidth, window.innerHeight);
		};
	}, []);

	React.useEffect(() => {
		if (enableCustomGamma) {
			colorRef.current.setRed(red);
			colorRef.current.setGreen(green);
			colorRef.current.setBlue(blue);
			return;
		}

		colorRef.current.setRed(255);
		colorRef.current.setGreen(255);
		colorRef.current.setBlue(255);
	}, [red, green, blue, enableCustomGamma]);

	return {
		sketch,
		videoRef,
		canvasRef,
	};
};
