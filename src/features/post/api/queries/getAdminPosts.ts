import { resolver } from '@blitzjs/rpc';
import db from 'db';
import { Ctx } from 'blitz';

export default resolver.pipe(async (_ = null, ctx: Ctx) => {
	if (!ctx.session.userId) throw new Error('Not authenticated');

	const posts = await db.post.findMany({
		include: {
			categories: true,
			createdBy: true,
						comments: {
				include: {
					createdBy: true,
				},
			},
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	return posts;
});
