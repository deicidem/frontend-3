import { Chip } from '@mui/material';

export default function Category({ title }: { title: string }) {
	return <Chip size='small' label={title} color='primary' />;
}
