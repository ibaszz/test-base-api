import { IsNotEmpty } from 'class-validator';

export class BaseApiRequest {
  @IsNotEmpty()
  transactionId: string;
  @IsNotEmpty()
  channel: string;
}
