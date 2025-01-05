import { IComment } from '@/entities/comment';

export interface IPost {
	id: string;
	createdById: string;
	createdAt: Date;
	updatedAt?: Date | null;
	updatedBy?: string | null;
	title: string;
	description?: string | null;
	categories: ICategory[];
	comments: IComment[];
}
