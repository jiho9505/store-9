namespace AuthRequest {
  export interface Login extends FormData {
    id?: string;
    password?: string;
  }

  export type Signup = FormData;
}

export default AuthRequest;
