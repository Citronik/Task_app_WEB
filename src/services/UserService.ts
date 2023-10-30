import apiClient from '@/store/modules/apiClient';
import { User } from '@/models/User';
import UploadService from './UploadService';

class UserService {
  async getUserPhoto(userId: Number): Promise<string> {
    try {
    const res = await apiClient.get('users/'+ userId);
    //console.log(res.data.data);
    if (!res.data ) {
      return '';
    }
    const profile = res.data.data.profile;
    return await UploadService.getPhotoUrl(profile.avatar_id);
    } catch (error) {
      console.log(error);
      return '';
    }
  }
  //async updateUserProfile(user: User): Promise<any> {
  //
  //}
}
export default new UserService();
