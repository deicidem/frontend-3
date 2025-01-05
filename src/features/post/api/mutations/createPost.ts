import { resolver } from '@blitzjs/rpc';
import db from 'db';
import { z } from 'zod';

const CreatePost = z.object({
	id: z.string().optional(),
	title: z.string().min(1),
	description: z.string().optional(),
	categoryIds: z.array(z.string()),
});

export default resolver.pipe(
	resolver.zod(CreatePost),
	resolver.authorize(),
	async (input, ctx) => {
		const userId = ctx.session.userId;
		if (!userId) throw new Error('Not authenticated');

		const isUpdate = !!input.id;

		const postData = {
			title: input.title,
			description: input.description,
			createdById: userId,
		};

		let post;
		if (isUpdate) {
			post = await db.post.update({
				where: { id: input.id },
				data: {
					...postData,
					categories: {
						set: input.categoryIds.map((id) => ({ id })),
					},
				},
				include: {
					categories: true,
					createdBy: true,
				},
			});
		} else {
			post = await db.post.create({
				data: {
					...postData,
					categories: {
						connect: input.categoryIds.map((id) => ({ id })),
					},
				},
				include: {
					categories: true,
					createdBy: true,
				},
			});
		}

		return post;
	}
);
