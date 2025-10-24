import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class SuppliersDto{
  @IsString()
  @ApiProperty({
    description:'write company is name'
  })
  companyName:string


  @IsString()
  @ApiProperty({
    description:'write a specification'
  })
  specification:string

  @IsString()
  @ApiProperty({
    description:'write a product name'
  })
  productName:string
}