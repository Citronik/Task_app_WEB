import { Profile } from './Profile';

export class User{
  id: number = 0;
  username: string = '';
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  avatar: string = '';
  bio: string = '';
  profile: Profile = new Profile();
  created_at: string = '';
  updated_at: string = '';

  constructor(data: Partial<User> = {}) {
    Object.assign(this, data);
  }

}
