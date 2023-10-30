export class Profile{
  id: number = 0
  user_id: number = 0
  avatar_id: number = 0
  avatar: File = null
  bio: string = ''
  created_at: string = ''
  updated_at: string = ''

  constructor(data: Partial<Profile> = {}) {
    Object.assign(this, data);
  }

}
