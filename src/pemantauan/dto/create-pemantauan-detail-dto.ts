import { ApiProperty } from "@nestjs/swagger";

export class CreatePemantauanDetailDto {
    @ApiProperty({ description: 'ID Pemantauan', default: '1' })
    supervisionId: number
    @ApiProperty({description: "Peruntukan", default: "MCK"})
    peruntukan: string | null
    @ApiProperty({description: "Longitude", default: 106.8129184})
    longitude: number
    @ApiProperty({description: "Latitude", default: -6.1291534})
    latitude: number
    @ApiProperty({description: "Alamat Sumur", default: "Jalan Tongol No. 4"})
    alamatSumur: string | null
    @ApiProperty({description: "Kedalaman Sumur", default: 150})
    kedalamanSumur: number | null
    @ApiProperty({default: 100})
    kedalamanKonstruksi: number | null
    @ApiProperty({default: 50})
    kedalamanMukaAirTanah: number | null
    @ApiProperty({default: "0-10, 20-30, 67-80"})
    kedalamanAkuifer: string | null
    @ApiProperty({default: "10-20, 30-40, 77-90"})
    posisiPipaScreen: string | null
    @ApiProperty({default: "90-100"})
    gravel: string
    @ApiProperty({default: "80-90"})
    lempung: string
    @ApiProperty({default: "0-10"})
    corSemen: string
    @ApiProperty({default: 1})
    diameterPipaNaik: number
    @ApiProperty({default: 1})
    panjangPipaNaik: number
    @ApiProperty({description: "Diameter Lubang Pengeboran", default: 1})
    diameterLubangPengeboran: number | null
    @ApiProperty({default: 1})
    diameterKonstruksi: number
    @ApiProperty({default: "tidak ada catatan"})
    catatanPengeboran: string | null
}
