'use client';
import { Box, Menu, MenuItem } from '@mui/material';
import { ReactNode, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
type TDropdownProps = {
	target?: ReactNode;
	items: TItemDropdown[];
};

type TItemDropdown = {
	content: ReactNode | string | number;
	onClick?: () => void;
};
export const Dropdown = ({ target, items }: TDropdownProps) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box>
			<Box
				component='div'
				onClick={(event) => {
					event.stopPropagation();
					event.preventDefault();
					handleClick(event);
				}}
				sx={{ cursor: 'pointer' }}>
				{target ? (
					target
				) : (
					<Box>
						<MoreVertIcon />
					</Box>
				)}
			</Box>
			<Menu
				id='basic-menu'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				onClick={(event) => {
					event.stopPropagation();
					event.preventDefault();
				}}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}>
				{items.map((item, index) => (
					<MenuItem onClick={item.onClick} key={`key-menuItem${index}`}>
						{item.content}
					</MenuItem>
				))}
			</Menu>
		</Box>
	);
};
