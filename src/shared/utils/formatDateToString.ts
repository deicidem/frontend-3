export function formatDateToString(date: Date, format = 'dd.MM.yyyy'): string {
	if (!(date instanceof Date) || isNaN(date.getTime())) {
		throw new Error('Invalid date provided');
	}

	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();

	switch (format) {
		case 'dd.MM.yyyy':
			return `${day}.${month}.${year}`;
		case 'yyyy-MM-dd':
			return `${year}-${month}-${day}`;
		default:
			throw new Error('Unsupported format provided');
	}
}
