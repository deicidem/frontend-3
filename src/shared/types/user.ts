export {};

declare global {
	export interface IAuthor {
		createdAt: Date;
		email: string;
		firstName: string;
		hashedPassword: string;
		id: string;
		lastName: string;
		role: 'ADMIN';
		updatedAt: Date;
	}
	export interface IUserBase {
		login: string;
		password: string;
		firstName: string;
		lastName: string;
	}

	export interface IAdminSearch {
		id: string;
		email: string;
		firstName: string;
		lastName: string;
	}
}
