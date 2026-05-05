export interface AuthData {
  user: User,
  session:{
    access_token: string
    token_type: string
    expires_in: number
    expires_at: number
    refresh_token: string
  }
}

export interface User {
  id: string
  aud: string
  role: string
  email: string
  email_confirmed_at: string
  phone: string
  confirmed_at: string
  last_sign_in_at: string
  created_at: string
  updated_at: string
  is_anonymous: boolean
}

export type MdFileData = {
  content: string,
  id: number,
  title: string,
  extra?: string | null | undefined,
  user_owner_id: string,
}
