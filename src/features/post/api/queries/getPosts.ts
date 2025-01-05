import { resolver } from '@blitzjs/rpc';
import db from 'db';

export default resolver.pipe(async () => {
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
