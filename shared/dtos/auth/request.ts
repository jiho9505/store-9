namespace AuthRequest {
  export interface Login {
    id?: string;
    password?: string;
  }

  export type Signup = FormData;
}

export default AuthRequest;
