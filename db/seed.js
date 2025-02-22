import { hash256 } from '@blitzjs/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const category1 = await prisma.category.create({
		data: {
			title: 'IT',
		},
	});

	const category2 = await prisma.category.create({
		data: {
			title: 'Обзоры',
		},
	});

	// Обновляем создание пользователей согласно схеме
	const user1 = await prisma.user.create({
		data: {
			firstName: 'Админ',
			lastName: 'Админов',
			email: 'admin1@example.com',
			hashedPassword: hash256('password'),
			role: 'ADMIN',
		},
	});

	const user2 = await prisma.user.create({
		data: {
			firstName: 'Юзер',
			lastName: 'Юзеров',
			email: 'client1@example.com',
			hashedPassword: hash256('password'),
			role: 'CLIENT',
		},
	});

	const post1 = await prisma.post.create({
		data: {
			title: 'Новая статья про IT',
			description: 'Текст статьи про IT...',
			createdById: user1.id,
			categories: {
				connect: [{ id: category1.id }],
			},
		},
	});

	const post2 = await prisma.post.create({
		data: {
			title: 'Обзор нового продукта',
			description: 'Текст обзора нового продукта...',
			createdById: user2.id,
			categories: {
				connect: [{ id: category2.id }],
			},
		},
	});

	const post3 = await prisma.post.create({
		data: {
			title: 'Обзор приложения',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae rerum magni, maxime a non, ullam harum aliquid numquam doloremque tenetur molestiae hic velit nobis eum minus dolor eius tempora dicta!',
			createdById: user1.id,
			categories: {
				connect: [{ id: category1.id }, { id: category2.id }],
			},
		},
	});

	const comment1 = await prisma.comment.create({
		data: {
			text: 'Отличная статья!',
			createdById: user1.id,
			postId: post1.id,
		},
	});

	const comment2 = await prisma.comment.create({
		data: {
			text: 'Согласен!',
			createdById: user2.id,
			postId: post1.id,
		},
	});

	console.log({
		categories: [category1, category2],
		users: [user1, user2],
		posts: [post1, post2, post3],
		comment: [comment1, comment2],
	});
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
