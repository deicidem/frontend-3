import db from 'db';

export default async function signup(input: {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	isAdmin: boolean;
}) {
	const hashedPassword = input.password.trim();
	const email = input.email.toLowerCase().trim();

	const user = await db.user.create({
		data: {
			email,
			hashedPassword,
			firstName: input.firstName.trim(),
			lastName: input.lastName.trim(),
			role: input.isAdmin ? 'ADMIN' : 'CLIENT',
		},
		select: {
			id: true,
			firstName: true,
			lastName: true,
			email: true,
			role: true,
		},
	});

	return user;
}
