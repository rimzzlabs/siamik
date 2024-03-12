import { signInWithEmail } from '#/service/auth'
import { SignInSchema } from '#/validations/auth'

import { type AuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { tryit } from 'radash'

export const authConfig = {
  pages: {
    signIn: '/auth/signin',
  },
  providers: [
    Credentials({
      id: 'credentials',
      type: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          placeholder: 'Alamat email anda',
          type: 'email',
        },
        password: {
          label: 'Password',
          placeholder: 'Password anda',
          type: 'password',
        },
      },
      async authorize(credentials) {
        const zParse = SignInSchema.safeParse({
          email: credentials?.email,
          password: credentials?.password,
        })

        if (!zParse.success) return null

        const [err, user] = await tryit(signInWithEmail)(zParse.data)

        if (err) {
          console.warn('error => ', err.message)
          return null
        }
        if (!user.profile) return null

        return {
          id: user.id,
          email: user.email,
          name: user.profile.name,
          image: user.profile.image,
          role: user.profile.role,
        }
      },
    }),
  ],
  callbacks: {
    session(params) {
      return params.session
    },
  },
} satisfies AuthOptions
