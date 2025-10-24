import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SuppliersDto } from './dto/suppliers.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplierEntity } from 'src/core/db/entities/supplier.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(SupplierEntity)
    private readonly SupplierRepository: Repository<SupplierEntity>,
    private readonly UserService: UserService,
  ) {}
  async createSuppiers(suppliersDto: SuppliersDto, email: string) {
    const user = await this.UserService.findEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const data = await this.SupplierRepository.create({
      ...suppliersDto,
      user,
    });
    const result =  await this.SupplierRepository.save(data);
    if(!result){
        throw new BadRequestException('not be created')
    }
    return {message:'Created successfully'}
  }
}
