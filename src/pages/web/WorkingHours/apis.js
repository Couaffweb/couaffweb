import { POST } from 'utils';
import { editProfile } from 'constants/apiEndpoint';
export const updateProfile = (data) => POST(editProfile, data);
