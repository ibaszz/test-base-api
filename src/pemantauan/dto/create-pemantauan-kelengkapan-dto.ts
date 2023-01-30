import { ApiProperty } from "@nestjs/swagger";

export class CreatePemantauanKelengkapanDto {
    @ApiProperty({ description: 'ID Pemantauan', default: '1' })
    supervisionId: number
    @ApiProperty({ description: 'Korlap', default: 'Korlap 1' })
    namaKoordinatorLapangan: string;
    @ApiProperty({ default: "Juru Bor"})
    namaJuruBor: string;
    @ApiProperty({ default: "Wellsite Geologist"})
    namaWellsiteGeo: string
    @ApiProperty({default: ["Anggota 1", "Anggota2"]})
    namaAnggotaTim: string[]
}