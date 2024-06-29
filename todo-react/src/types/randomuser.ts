export interface ApiResponse {
  results: Result[]
  info: Info
}

export interface Info {
  seed: string
  results: number
  page: number
  version: string
}

export interface Result {
  name: Name
  email: string
  login: Login
  picture: Picture
}

export interface Login {
  uuid: string
  username: string
  password: string
  salt: string
  md5: string
  sha1: string
  sha256: string
}

export interface Name {
  title: Title
  first: string
  last: string
}

export enum Title {
  MS = "Ms",
  Mr = "Mr",
  Mrs = "Mrs",
}

export interface Picture {
  large: string
  medium: string
  thumbnail: string
}
