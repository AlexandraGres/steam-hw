export interface User {
  id?: string,
  uId?: string
  email: string
  password?: string
  username?: string,
  age?: number
  returnSecureToken?: boolean
}

export interface FBAuthResponse {
  idToken: string
  expiresIn: string
}

export interface FbCreateResponse {
  name: string
}

export interface Game {
  id?: ''
  name: string,
  description: string,
  price: string,
  tag: string[],
  library: boolean
}
