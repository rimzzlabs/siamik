/* eslint-disable @typescript-eslint/no-unused-vars */
import NextaAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      email: string
      name: string
      image?: string
    }
  }
}
