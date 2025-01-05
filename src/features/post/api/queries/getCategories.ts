import { resolver } from '@blitzjs/rpc';
import db from '../../../../../db';
import { z } from 'zod';

const GetCategoriesSchema = z.object({
	page: z.number().min(1).optional().default(1),
	limit: z.number().min(1).max(50).optional().default(10),
});
export default resolver.pipe(
	resolver.zod(GetCategoriesSchema),
	async ({ page, limit }) => {
		const skip = (page - 1) * limit;

		const categories = await db.category.findMany({
			skip,
			take: limit,
			orderBy: {
				title: 'asc',
			},
		});

		const total = await db.category.count();

		return {
			categories,
			total,
			page,
			hasMore: skip + categories.length < total,
		};
	}
);
