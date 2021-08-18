import { Optional } from '@shared/operators';
import { UserSchema } from '../user/schema';

namespace AuthRequest {
  export type Login = {
    userId: string;
    password: string;
  };

  export type Signup = Optional<Omit<UserSchema, 'id'>, 'callNumber'>;
}

export default AuthRequest;
