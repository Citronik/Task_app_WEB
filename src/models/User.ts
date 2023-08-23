export class User{
  id: number = 0;
  username: string = '';
  email: string = '';
  first_name: string = '';
  last_name: string = '';
  avatar: string = '';
  bio: string = '';
  created_at: string = '';
  updated_at: string = '';

  constructor(data: Partial<User> = {}) {
    Object.assign(this, data);
  }

}
