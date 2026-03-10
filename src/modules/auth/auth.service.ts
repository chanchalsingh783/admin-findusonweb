import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { findUserByEmail } from "./auth.repository"

const JWT_SECRET = process.env.JWT_SECRET || "secret"

export const loginUser = async (email: string, password: string) => {

  const user = await findUserByEmail(email)

  if (!user) {
    throw new Error("User not found")
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    throw new Error("Invalid password")
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "1d" }
  )

  return { token, user }
}