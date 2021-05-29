import { POST } from 'utils';
import { newLatterEMAIL } from 'constants/apiEndpoint';
export const sendEmail = (email) => POST(newLatterEMAIL, { email });
