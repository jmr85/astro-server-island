import { defineAction } from 'astro:actions';
import { prisma } from '../../db';

export const getComments = defineAction({
  accept: 'json',
  handler: async () => {
    try {
      const comments = await prisma.comment.findMany();
      return comments;
    } catch (error) {
      console.log(error);
      throw 'Error getting comments';
    }
  },
});