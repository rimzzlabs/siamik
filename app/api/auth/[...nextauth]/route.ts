import { authConfig } from '#/src/lib/auth'

import nextAuth from 'next-auth'

const auth = nextAuth(authConfig)

export { auth as GET, auth as POST }
