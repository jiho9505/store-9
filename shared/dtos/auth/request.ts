namespace AuthRequest {
  export interface Login {
    id?: string;
    password?: string;
  }

  export type Signup = FormData;

  export type GithubLogin = {
    code: string;
  };
}

export default AuthRequest;
