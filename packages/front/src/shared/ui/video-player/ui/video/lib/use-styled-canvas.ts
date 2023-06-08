import { Renderer } from 'p5';
import * as React from 'react';

export interface UseStyledCanvasParams {
	readonly canvasRef: React.RefObject<Renderer>;
	readonly className?: string;
	readonly styles?: React.CSSProperties | null;
}

export const useStyledCanvas = (params: UseStyledCanvasParams) => {
	const { canvasRef, className, styles, } = params;
	React.useEffect(() => {
		if (!canvasRef.current || !className) {
			return;
		}
		const canvas = canvasRef.current as Renderer;
		canvas.addClass(className);

		return () => {
			canvas.removeClass(className);
		};
	}, [className]);

	React.useEffect(() => {
		if (!canvasRef.current || !className) {
			return;
		}
		const canvas = canvasRef.current as Renderer;
		canvas.style('filter', styles?.filter ?? '');
	}, [styles]);
};
