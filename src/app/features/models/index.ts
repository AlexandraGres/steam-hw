export interface User {
  id?: string
  uid?: string
  email: string
  username?: string
  age?: number
  library?: Game[]
  friends?: []
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
  name: string
  description: string
  price: string
  tag: string[]
}
