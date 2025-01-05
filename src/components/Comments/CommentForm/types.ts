import { IPost } from '@/entities/post';

export type CommentFormData = {
	id?: string;
	text: string;
	createdById: string;
	postId: string;
};

export type TCommentFormData = {
	post: IPost;
	initialData?: CommentFormData;
	onSubmit?: (data: CommentFormData) => void;
	submitButtonText?: string;
};
