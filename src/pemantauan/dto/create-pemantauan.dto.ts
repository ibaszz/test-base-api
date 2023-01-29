import { ApiProperty } from "@nestjs/swagger";

export class CreatePemantauanDto {
    
    @ApiProperty({ description: 'Sumur-ke', default: '1' })
    sumurKe: number;
}
