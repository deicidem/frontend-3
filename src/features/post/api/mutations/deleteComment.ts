import { resolver } from '@blitzjs/rpc';
import db from 'db';
import { z } from 'zod';

const DeleteComment = z.object({
	id: z.string(),
});

export default resolver.pipe(
	resolver.zod(DeleteComment),
	resolver.authorize(),
	async ({ id }, ctx) => {
		const userId = ctx.session.userId;
		if (!userId) throw new Error('Not authenticated');

		const comment = await db.comment.findUnique({
			where: {
				id,
				createdById: userId,
			},
		});

		if (!comment) {
			throw new Error(
				'Comment not found or you are not authorized to delete it'
			);
		}

		await db.$transaction([
			db.comment.delete({
				where: { id },
			}),
		]);

		return comment;
	}
);
