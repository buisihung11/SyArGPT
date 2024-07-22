import { User } from "@prisma/client"
import prisma from "@/lib/prisma"

export const getUserById = async (id: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: {
      id
    }
  })
}

const userRepository = {
  getUserById
}

export default userRepository
