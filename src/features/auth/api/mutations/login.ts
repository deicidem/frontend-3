import { resolver } from '@blitzjs/rpc';
import { AuthenticationError } from 'blitz';
import db from '../../../../../db';
import type { Role } from '../../../../../types';
import { z } from 'zod';

const Input = z.object({
	email: z.string().email(),
	password: z.string(),
});
export default resolver.pipe(
	resolver.zod(Input),
	async ({ email, password }, ctx) => {
		const user = await db.user.findFirst({
			where: {
				email: email.toLowerCase().trim(),
			},
		});

		if (!user) throw new AuthenticationError('User not found');

		// Compare password
		if (user.hashedPassword !== password) {
			throw new AuthenticationError('Invalid password');
		}

		// Create session
		await ctx.session.$create({
			userId: user.id,
			role: user.role as Role,
			isAuthorized: true,
		});

		return user;
	}
);
