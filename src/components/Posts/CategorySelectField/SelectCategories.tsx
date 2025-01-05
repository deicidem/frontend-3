import { useEffect, useState } from 'react';
import { useQuery } from '@blitzjs/rpc';
import getCategories from '@/features/post/api/queries/getCategories';
import { CategorySelectField } from './CategorySelectField';
import { TSelectCategoriesProps } from './types';

export const SelectCategories = ({
	categories,
	onSetCategoriesData,
	...rest
}: TSelectCategoriesProps) => {
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);

	const [categoriesQuery] = useQuery(
		getCategories,
		{
			page,
			limit: 10,
		},
		{
			suspense: true,
			refetchOnWindowFocus: false,
		}
	);

	useEffect(() => {
		if (categoriesQuery?.categories) {
			onSetCategoriesData((prev) =>
				page === 1
					? categoriesQuery.categories
					: [...prev, ...categoriesQuery.categories]
			);
			setHasMore(categoriesQuery.hasMore);
			setLoading(false);
		}
	}, [categoriesQuery, page]);

	return (
		<CategorySelectField
			name='categoryIds'
			label='Категории'
			options={categories || []}
			loading={loading}
			{...rest}
		/>
	);
};
