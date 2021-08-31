import { UserSchema } from '../user/schema';

namespace AuthResponse {
  export type Login = UserSchema;
  export type GithubLogin = { loginId: string };

  export type GetTerms = {
    terms1: string;
    terms2: string;
  };
}

export default AuthResponse;
