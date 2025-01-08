import { Box, Button } from '@mui/material';
import { useQuery } from '@blitzjs/rpc';
import getAllCategories from '@/features/post/api/queries/getAllCategories';
import { CategoryFilterDropdown } from './CategoryFilterDropdown';

type PostFiltersProps = {
	selectedCategories: string[];
	sortOrder: 'asc' | 'desc';
	onCategoriesChange: (categories: string[]) => void;
	onSortChange: (order: 'asc' | 'desc') => void;
};

export const PostFilters = ({
	selectedCategories,
	sortOrder,
	onCategoriesChange,
	onSortChange,
}: PostFiltersProps) => {
	const [categoriesData] = useQuery(getAllCategories, undefined);
	const categories = categoriesData || [];

	return (
		<Box
			sx={{
				display: 'flex',
				gap: 2,
				mb: 3,
				alignItems: 'center',
				flexWrap: 'wrap',
			}}>
			<CategoryFilterDropdown
				categories={categories}
				selectedCategories={selectedCategories}
				onCategoryChange={onCategoriesChange}
			/>

			<Button
				variant='outlined'
				onClick={() => onSortChange(sortOrder === 'asc' ? 'desc' : 'asc')}>
				{sortOrder === 'asc' ? 'Сначала новые' : 'Сначала старые'}
			</Button>
		</Box>
	);
};
