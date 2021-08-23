import { Optional } from '@shared/operators';
import { UserSchema } from '../user/schema';

namespace AuthRequest {
  export interface Login extends FormData {
    id?: string;
    password?: string;
  }

  export type Signup = FormData;
}

export default AuthRequest;
