import { z } from "zod";

export const createTodo = z.object({
  task: z.string(),
});