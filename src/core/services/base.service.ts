import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from '../db/entities/user.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export abstract class BaseService<Entity extends UserEntity> {
  constructor(private readonly repository: Repository<Entity>) {}
  async createUser(createDto: DeepPartial<Entity>) {
    try {
      const createUserData = this.repository.create(createDto);
      const saveUser = this.repository.save(createUserData);
      return saveUser;
    } catch (error) {
        throw new BadRequestException(error)
    }
  }
}
