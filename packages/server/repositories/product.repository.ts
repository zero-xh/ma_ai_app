import { getPrismaClient } from '../lib/prisma';

const prisma = getPrismaClient();
export const productRepository = {
   async getProduct(productId: number) {
      return await prisma.product.findUnique({
         where: { id: productId },
      });
   },
};
