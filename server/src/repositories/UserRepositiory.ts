import { DeleteResult, EntityRepository, Repository, UpdateResult } from 'typeorm';
import User from '../entities/user';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  checkUserExist(login_id: string): Promise<User> {
    return this.findOne({ where: [{ login_id }] });
  }

  findUser(login_id: string, password: string): Promise<User> {
    return this.findOne({ where: [{ login_id, password }] });
  }

  createUser(user): Promise<User[]> {
    const newUser = this.create(user);
    return this.save(newUser);
  }

  modifyUser(user, newUser): Promise<UpdateResult> {
    return this.update(user, newUser);
  }

  deleteUser(user): Promise<DeleteResult> {
    return this.delete(user);
  }
}
