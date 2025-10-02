import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/core/db/entities/user.entity';
import { BaseService } from 'src/core/services/base.service';
import { Repository } from 'typeorm';

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    protected userRepository: Repository<UserEntity>,
  ) {
    super(userRepository);
  }
  async findEmail(email: string) {
    return this.userRepository.findOneBy({email})
  }
}
