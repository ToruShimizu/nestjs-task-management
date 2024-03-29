import { InternalServerErrorException } from '@nestjs/common';
import { ConflictException } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto) {
    const { username, password } = authCredentialsDto;

    const user = new User();

    user.username = username;
    // ハッシュ化
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (e) {
      if (e.code === '23505')
        throw new ConflictException('Username already exists');
      else throw new InternalServerErrorException();
    }
  }
  async validateUserPassword(authCredentialsDto: AuthCredentialsDto) {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ username });
    if (user && (await user.validatePassword(password))) return user.username;
    else return null;
  }
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
