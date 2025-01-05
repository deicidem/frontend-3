import { resolver } from '@blitzjs/rpc';

export default resolver.pipe(async (input, ctx) => {
	await ctx.session.$revoke();
	return true;
});
