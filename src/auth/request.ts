import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { BaseApiRequest } from 'src/Common/request/BaseApiRequest';

export class LoginRequestDto extends BaseApiRequest {
  @ApiProperty({ description: 'Email User', default: 'test@gmail.com' })
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @ApiPropertyOptional({ description: 'Password User', default: 'xxxxx' })
  password: string;
}

export class LoginRequestV2Dto extends BaseApiRequest {
  @IsEmail()
  @ApiProperty({ description: 'Email User', default: 'test@gmail.com' })
  email: string;
}
