import { User_Role } from '../../entities/user';

interface UserSeed {
  role: User_Role;
  email: string;
  password: string;
  name: string;
  phone: string;
  birth: Date;
  address: string;
  call_number: string;
}

const userSeed: UserSeed[] = [
  {
    role: User_Role.User,
    email: 't1@t.com',
    password: 'test',
    name: 'test1',
    phone: '123',
    birth: new Date(),
    address: 'seoul',
    call_number: '010',
  },
];

export default userSeed;
