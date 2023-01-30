import { ApiProperty } from "@nestjs/swagger";
import { TagPhoto } from "@prisma/client";

export class CreatePemantauanPhotoDto {
    @ApiProperty({ description: 'ID Pemantauan', default: '1' })
    supervisionId: number
    @ApiProperty({ description: 'Image String', default: 'Image' })
    base64: string;
    @ApiProperty({ default: TagPhoto.OTHERS, enum: TagPhoto})
    tag: TagPhoto;
    @ApiProperty({ description: 'Caption', default: "Ini Adalah Photo saat"})
    caption: string;
}