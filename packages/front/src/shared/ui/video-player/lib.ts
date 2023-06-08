export const parseTime = (seconds: globalThis.GLfloat) => {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds - hours * 3600) / 60);
	seconds = Math.floor(seconds - hours * 3600 - minutes * 60);

	return `${hours.toString().padStart(2, '0')}:${minutes
		.toString()
		.padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
