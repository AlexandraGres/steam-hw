export interface User {
  email: string
  id?: string
  uid?: string  
  username?: string
  age?: number
  library?: Game[]
  friends?: string[]
}

export interface Game {
  name: string
  description: string
  price: string
  id?: string  
  tag: string[]
}
