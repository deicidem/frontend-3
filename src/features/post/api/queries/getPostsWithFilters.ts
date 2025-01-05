import { resolver } from '@blitzjs/rpc';
import db from 'db';
import { z } from 'zod';

const PostsQuery = z.object({
	page: z.number().min(1).default(1),
	perPage: z.number().min(1).default(6),
	categoryIds: z.array(z.string()).optional(),
	sortBy: z.enum(['asc', 'desc']).default('asc'),
});

export default resolver.pipe(
	resolver.zod(PostsQuery),
	async ({ page, perPage, categoryIds, sortBy }) => {
		const skip = (page - 1) * perPage;

		const where = {
			...(categoryIds && categoryIds.length > 0
				? {
						categories: {
							some: {
								id: { in: categoryIds },
							},
						},
				  }
				: {}),
		};

		const [posts, totalCount] = await Promise.all([
			db.post.findMany({
				where,
				include: {
					categories: true,
								comments: {
				include: {
					createdBy: true,
				},
			},
					createdBy: true,
				},
				orderBy: {
					createdAt: sortBy,
				},
				skip,
				take: perPage,
			}),
			db.post.count({ where }),
		]);

		return {
			posts: posts,
			totalPages: Math.ceil(totalCount / perPage),
			currentPage: page,
			totalCount,
		};
	}
);
