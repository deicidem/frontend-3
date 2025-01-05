import { Stack } from '@mui/material';
import Category from './Category';

export default function CategoryList({
	categories,
}: {
	categories: ICategory[];
}) {
	return (
		<Stack direction='row' flexWrap={'wrap'} rowGap={'8px'} columnGap={'8px'}>
			{categories.map((category, index) => (
				<Category key={`${index}-category`} title={category.title} />
			))}
		</Stack>
	);
}
