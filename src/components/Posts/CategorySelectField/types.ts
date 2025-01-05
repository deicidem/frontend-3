import { Control, FieldErrors } from 'react-hook-form';

export type TSelectCategoriesProps = {
	categories: ICategory[];
	onSetCategoriesData: (prev: any) => void;
	control: Control<any>;
	errors: FieldErrors;
};

export type TCategorySelectFieldProps = {
	name: string;
	label: string;
	control: Control<any>;
	errors: FieldErrors;
	options: ICategory[];
	loading?: boolean;
	onLoadMore?: () => void;
};
