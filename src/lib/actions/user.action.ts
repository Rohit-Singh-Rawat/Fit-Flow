"use server"

import prisma from "../db";

export async function getUserById(params:{userId:string}) {
  try {
    const {userId} = params;
    const user = await prisma.user.findFirst({where:{clerkId: userId}})
    return user
  } catch (error) {
    
  }
}