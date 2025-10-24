import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class ProfileService {
    constructor(private readonly userService:UserService){}
  async getProfile(email: string) {{
    return await this.userService.findEmailRelations(email)
  }}
}
