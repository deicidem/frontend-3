export type PostFormData = {
	id?: string;
	title: string;
	description?: string;
	categoryIds: string[];
	createdById: string;
};

export type TPostFormProps = {
	initialData?: PostFormData;
	onSubmit?: (data: PostFormData) => void;
	submitButtonText?: string;
};
