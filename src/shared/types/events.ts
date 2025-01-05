export {};

declare global {
	export interface ICategory {
		id: string;
		title: string;
	}

	export interface IFormat {
		id: string;
		formatName: 'онлайн' | 'офлайн' | 'гибрид';
		link?: string;
		address?: string;
	}
}
