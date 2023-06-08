/// <reference types="node" />

declare namespace NodeJS {
	interface Process {
		env: ProcessEnv;
	}

	interface ProcessEnv {
		readonly API_KEY: string;
		readonly DATABASE_URL: string;
		readonly PORT: string;
		readonly FFMPEG: string;
		readonly SECRET: string;
	}
}
