export interface LoginParams {
	readonly login: string;
	readonly password: string;
}

export interface RegistrationParams {
	readonly login: string;
	readonly password: string;
}

export interface AuthUser {
	readonly id: number;
	readonly login: string;
}

export interface Tokens {
	readonly accessToken: string;
	readonly refreshToken: string;
}

export interface AuthResponse extends AuthUser {
	readonly user: AuthUser;
	readonly tokens: Tokens;
}
