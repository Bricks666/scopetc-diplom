import { RefObject, useEffect, useState } from 'react';

export interface UseIntersectionOptions
	extends globalThis.IntersectionObserverInit {
	readonly containerRef: RefObject<HTMLElement>;
}

export const useIntersection = (options: UseIntersectionOptions) => {
	const { containerRef, ...rest } = options;
	const [observeEntry, setObserveEntry] =
		useState<IntersectionObserverEntry | null>(null);

	useEffect(() => {
		const handler = (entries: IntersectionObserverEntry[]) => {
			setObserveEntry(entries[0]);
		};

		const observer = new IntersectionObserver(handler, rest);
		if (containerRef.current) {
			observer.observe(containerRef.current);
		}

		return () => {
			setObserveEntry(null);
			observer.disconnect();
		};
	}, [rest.root, rest.rootMargin, rest.threshold, containerRef.current]);

	return observeEntry;
};
