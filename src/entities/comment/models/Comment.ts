import { User } from 'db';

export interface IComment {
	id: string;
	createdById: string;
	createdAt: Date;
	createdBy: User;
	updatedAt?: Date | null;
	updatedBy?: string | null;
	text: string;
}
