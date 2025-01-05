import { resolver } from '@blitzjs/rpc';
import db from 'db';
import { z } from 'zod';

const GetPostById = z.object({
	id: z.string(),
});

export default resolver.pipe(resolver.zod(GetPostById), async ({ id }) => {
	const post = await db.post.findUnique({
		where: { id },
		include: {
			categories: true,
			createdBy: true,
			comments: {
				include: {
					createdBy: true,
				},
			},
		},
	});

	if (!post) {
		throw new Error('Пост не найден');
	}

	return post;
});
