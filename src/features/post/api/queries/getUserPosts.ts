import { resolver } from '@blitzjs/rpc';
import db from 'db';
import { AuthenticationError } from 'blitz';

export default resolver.pipe(async (_, ctx) => {
	const userId = ctx.session.userId;
	if (!userId) throw new AuthenticationError();

	const posts = await db.post.findMany({
		where: {
			createdById: userId,
		},
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

	return posts;
});
