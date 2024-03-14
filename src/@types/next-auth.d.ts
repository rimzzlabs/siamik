/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Role } from '@prisma/client'
import NextaAuth from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    userId: string
    email: string
    name: string
    image?: string | null
  }
  interface Session {
    user: User
  }
}
