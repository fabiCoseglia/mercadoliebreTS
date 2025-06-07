import prisma from '../database/prismaClient';


export const getAllProducts = async () =>{
  return await prisma.products.findMany();
}