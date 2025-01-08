import {
	Box,
	Popover,
	Checkbox,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	Button,
} from '@mui/material';
import { BodyText } from '@/shared/components';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useRef, useState } from 'react';
import s from './styled.module.scss';

type CategoryFilterDropdownProps = {
	categories: Array<{ id: string; title: string }>;
	selectedCategories: string[];
	onCategoryChange: (categories: string[]) => void;
};

export const CategoryFilterDropdown = ({
	categories,
	selectedCategories,
	onCategoryChange,
}: CategoryFilterDropdownProps) => {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleToggleCategory = (categoryId: string) => {
		const newSelected = selectedCategories.includes(categoryId)
			? selectedCategories.filter((id) => id !== categoryId)
			: [...selectedCategories, categoryId];
		onCategoryChange(newSelected);
	};

	const open = Boolean(anchorEl);

	return (
		<>
			<Box className={s.container}>
				<Button ref={buttonRef} onClick={handleClick} variant='contained'>
					<Box className={s.containerBtn}>
						<BodyText text='Фильтровать по категориям' size='p1' />
						<FilterAltIcon fontSize='small' />
						{selectedCategories.length > 0 && `(${selectedCategories.length})`}
					</Box>
				</Button>
			</Box>

			<Popover
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}>
				<Box sx={{ p: 2 }}>
					<List>
						{categories.map((category) => (
							<ListItem
								key={category.id}
								dense
								button
								onClick={() => handleToggleCategory(category.id)}>
								<ListItemIcon sx={{ minWidth: 40 }}>
									<Checkbox
										edge='start'
										checked={selectedCategories.includes(category.id)}
									/>
								</ListItemIcon>
								<ListItemText primary={category.title} />
							</ListItem>
						))}
					</List>
				</Box>
			</Popover>
		</>
	);
};
