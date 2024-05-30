import bcrypt from "bcrypt";
import prisma from "../client";
import { Prisma } from "@prisma/client";

async function main() {

  // User Creation
  let password = "";

	const rawPassword = process.env.USER_PASSWORD as string;

	try {
		const salt = await bcrypt.genSalt(10);

		password = await bcrypt.hash(rawPassword, salt);

    const user: Prisma.UserCreateInput = {
      email: process.env.USER_EMAIL as string,
      username: process.env.USER_NAME as string,
      password,
    }

		const createdUser = await prisma.user.upsert({
			where: {
				email: user.email,
			},
			update: user,
			create: user,
		});

		console.log(createdUser);

    // Todo creation
    const todos: Prisma.TodoCreateManyInput[] = [
      {
        task: "task1",
        userId: createdUser.id,
      },
      {
        task: "task2",
        userId: createdUser.id,
      },
      {
        task: "task3",
        userId: createdUser.id,
      },
      {
        task: "task4",
        userId: createdUser.id,
      },
    ];

    await prisma.todo.createMany({
      data: todos,
    });

    console.log("Created initial data");
	} catch (err: any) {
		throw new Error(err);
	}
}

main()
  .then(async () => {
    console.log("Seed script finished execution");
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  })