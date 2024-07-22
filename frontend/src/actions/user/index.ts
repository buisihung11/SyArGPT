"use server"

import { User } from "@prisma/client"
import userRepository from "@/lib/repository/user"

export const getUserById = async (id: string): Promise<User | null> => {
  return await userRepository.getUserById(id)
}
