import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column()
  salt: string;

  // ハッシュ化されたパスワード受け取ったプロパティの比較
  async validatePassword(password: string) {
    const hash = await bcrypt.hash(password,this.salt);
    return hash === await this.password
  }
}
