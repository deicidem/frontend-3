import { Ctx } from 'blitz';

export default function publicMiddleware() {
	return async (req: any, ctx: Ctx) => {
		return req(ctx);
	};
}
