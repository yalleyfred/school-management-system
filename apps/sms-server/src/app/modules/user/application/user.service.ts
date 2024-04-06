
import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from '../../../domain/entities/user.entity';
import { NewUserDTO } from '../../../domain/dtos/auth.dto';
import { User } from '../../../domain/model/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findOne(username: string): Promise<UserEntity> {
    return this.userRepository.findOne({where: {email:username}});
  }

  async create(user: NewUserDTO): Promise<UserEntity> {
    return this.userRepository.save(user);
  }

  async remove(userId: string): Promise<void> {
    await this.userRepository.delete(userId);
  }

  public async updateUser(userId: string, userData: Partial<User>): Promise<UpdateResult> {
    return this.dataSource
      .createQueryBuilder()
      .update(UserEntity)
      .set({
        ...userData,
      })
      .where('id = :userId and hash_rt IS NOT NULL', { userId })
      .execute();
  }

  public async createHash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  public async compareHashes(password, userHash: string): Promise<boolean> {
    return bcrypt.compare(password, userHash);
  }

  public async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    return user;
  }

  public async removeUserByEmail(email: string): Promise<number> {
    const result = await this.userRepository.delete({ email });

    return result.affected;
  }

  public async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    return user;
  }

  public async getUserAsStringById(id: string): Promise<string> {
    const fullUser = await this.findUserById(id);

    return `${fullUser.firstName} ${fullUser.lastName}`;
  }

  public async updateRtHash(userId: string, rt: string): Promise<void> {
    const hash = await bcrypt.hash(rt, 10);

    await this.dataSource
      .createQueryBuilder()
      .update(UserEntity)
      .set({
        hastRt: hash,
      })
      .where('id = :userId', { userId })
      .execute();
  }

}
