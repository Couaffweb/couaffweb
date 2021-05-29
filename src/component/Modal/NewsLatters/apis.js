import { POST } from 'utils';
import { newLetterEMAIL } from 'constants/apiEndpoint';
export const sendEmail = (email) => POST(newLetterEMAIL, { email });
