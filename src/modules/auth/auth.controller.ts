import { NextResponse } from "next/server"
import { loginUser } from "./auth.service"

export const loginController = async (req: Request) => {

  try {

    const body = await req.json()
    const { email, password } = body

    const result = await loginUser(email, password)

    return NextResponse.json(result)

  } catch (error: any) {

    return NextResponse.json(
      { message: error.message },
      { status: 400 }
    )

  }

}