import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { prisma } from '../../db';

export const addComment = defineAction({
    accept: 'form',
    input: z.object({
      post_slug: z.string(),
      name: z.string().min(1, 'Name is required'),
      email: z.string().email('Valid email is required'),
      message: z.string().min(1, 'Comment cannot be empty'),
    }),
  handler: async ({ post_slug, name, email, message }) => {
    try {
      const comment = await prisma.comment.create({
        data: {
          post_slug,
          name,
          email,
          message
        }
      });
      return comment;
    } catch (error) {
      console.log(error);
      throw 'Error adding comment';
    }
  },
});