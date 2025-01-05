import { resolver } from '@blitzjs/rpc';
import db from 'db';
import { z } from 'zod';

const DeletePost = z.object({
	id: z.string(),
});

export default resolver.pipe(
	resolver.zod(DeletePost),
	resolver.authorize(),
	async ({ id }, ctx) => {
		const userId = ctx.session.userId;
		if (!userId) throw new Error('Not authenticated');

		const post = await db.post.findUnique({
			where: {
				id,
				createdById: userId,
			},
			include: {
				categories: true,
			},
		});

		if (!post) {
			throw new Error('Post not found or you are not authorized to delete it');
		}

		await db.$transaction([
			db.post.update({
				where: { id },
				data: {
					categories: {
						disconnect: post.categories.map((cat) => ({ id: cat.id })),
					},
				},
			}),

			db.post.delete({
				where: { id },
			}),
		]);

		return post;
	}
);
