import { Body, Controller, Post, Req } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { Auth } from 'src/core/decorators/auth.decorators';
import { SuppliersDto } from './dto/suppliers.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Auth()
  @Post()
  @ApiBearerAuth()
  async createSuppiers(@Body() suppliersDto:SuppliersDto , @Req() req){
    const email = req.user.email
    return await this.suppliersService.createSuppiers(suppliersDto,email)
  }
}
