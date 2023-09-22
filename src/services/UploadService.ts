import apiClient from '@/store/modules/apiClient';

class UploadService {
  public async getPhotoUrl(photoId: Number): Promise<string> {
    try {
    const res = await apiClient.get('uploads/'+ photoId);
    //console.log(res.data);
    if (!res.data ) {
      return '';
    }
    const baseURL = apiClient.getUri();
    const url = baseURL.replace('/api/', '') + res.data;
    return url;
    } catch (error) {
      console.log(error);
      return '';
    }
  }
}
export default new UploadService();
