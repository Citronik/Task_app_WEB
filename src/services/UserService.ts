import apiClient from '@/store/modules/apiClient';
//import { User } from '@/models/User';
import UploadService from './UploadService';

class UserService {
  async getUserPhoto(userId: Number): Promise<string> {
    try {
    const res = await apiClient.get('users/'+ userId);
    //console.log(res.data.data);
    if (!res.data ) {
      return '';
    }
    //const user: User = res.data;
    const profile = res.data.data.profile;
    //console.log(profile);
    return await UploadService.getPhotoUrl(profile.avatar_id);
    } catch (error) {
      console.log(error);
      return '';
    }
  }
}
export default new UserService();
