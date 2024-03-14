import { NextResponse } from 'next/server'

export function unauthorized() {
  return NextResponse.json({ message: 'Unauthorized!' }, { status: 401 })
}

export function conflict(message = 'Conflict') {
  return NextResponse.json({ message }, { status: 409 })
}

export function badRequest<T>(errors: T) {
  return NextResponse.json({ message: 'Bad request', errors }, { status: 400 })
}

export function created<T>(data: T) {
  return NextResponse.json({ message: 'Success', data }, { status: 201 })
}

export function ok<T>(data: T) {
  return NextResponse.json({ message: 'Success', data })
}

export function serverError<E extends Error>(err: E) {
  console.info('error =>', err)
  return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
}
