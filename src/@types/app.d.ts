declare global {
  type TResponseApi<T> = {
    data: T
    message: string
    errors?: Array<string>
  }
}

export {}
