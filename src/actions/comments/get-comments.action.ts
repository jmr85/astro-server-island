import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { prisma } from '../../db';

export const getComments = defineAction({
  accept: 'json',
  input: z.string(),
  handler: async (post_slug) => {
    try {
      const comments = await prisma.comment.findMany({
        where: {
          post_slug: post_slug
        },
        orderBy: {
          create_at: 'desc'
        }
      });
      return comments;
    } catch (error) {
      console.log(error);
      throw 'Error getting comments';
    }
  },
});