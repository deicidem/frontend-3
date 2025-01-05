import { resolver } from '@blitzjs/rpc';
import db from 'db';
import { z } from 'zod';

const CreateComment = z.object({
	id: z.string().optional(),
	text: z.string().min(1),
	postId: z.string(),
});

export default resolver.pipe(
	resolver.zod(CreateComment),
	resolver.authorize(),
	async (input, ctx) => {
		const userId = ctx.session.userId;
		if (!userId) throw new Error('Not authenticated');

		const isUpdate = !!input.id;

		const commentData = {
			text: input.text,
			postId: input.postId,
			createdById: userId,
		};

		let event;
		if (isUpdate) {
			event = await db.comment.update({
				where: { id: input.id },
				data: {
					...commentData,
				},
				include: {
					post: true,
					createdBy: true,
				},
			});
		} else {
			event = await db.comment.create({
				data: {
					...commentData,
				},
				include: {
					post: true,
					createdBy: true,
				},
			});
		}

		return event;
	}
);
