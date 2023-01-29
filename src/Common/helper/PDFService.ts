import { Injectable } from '@nestjs/common';
import { readdirSync, readFileSync } from 'fs';
import * as html_to_pdf from 'html-pdf-node';
import fs from 'fs';
import puppeteer from 'puppeteer';
import * as moment from 'moment';
import {
  supervisions,
  supervision_akuiver,
  supervision_details,
  supervision_photos,
  supervision_requirements,
  supervision_screen_pipe,
  supervision_well_spec,
  users,
} from '@prisma/client';

type SupervisionsType = supervisions & {
  user: users;
  supervisionDetail: supervision_details;
  supervisionRequirement: supervision_requirements;
  supervisionPhotos: supervision_photos[];
  supervisionScreenAkuifer: supervision_akuiver[];
  supervisionScreenPipe: supervision_screen_pipe[];
  supervisionWellSpec: supervision_well_spec;
};

@Injectable()
export class PDFService {
  async generatePemantauanPdf(): Promise<Buffer> {
    return new Promise((resolve) => {
      const options = { format: 'A4' };
      // Example of options with args //
      // let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };
      const html = readFileSync('src/Common/helper/index.html').toString();
      const file = {
        content: html,
      };

      html_to_pdf.generatePdf(file, options).then((pdfBuffer) => {
        resolve(pdfBuffer);
      });
    });
  }

  async generatePemantauanPDFPuppeteer(supervision: SupervisionsType) {
    const browser = await puppeteer.launch();

    // Create a new page
    const page = await browser.newPage();

    const html = readFileSync('src/Common/helper/index.html', 'utf-8');

    const parsedHtml = this.getHtml(html, supervision);

    await page.setContent(parsedHtml);

    await page.emulateMediaType('print');

    const buffer = await page.pdf({
      margin: { top: '10', left: '10' },
      printBackground: true,
      format: 'A4',
    });

    return buffer;
  }

  async generatePemantauanPDFPuppeteerHtml(supervision: SupervisionsType) {
    const html = readFileSync('src/Common/helper/index.html', 'utf-8');

    console.log('PAGE 1');
    const parsedHtml = this.getHtml(html, supervision);
    return parsedHtml;
  }

  getHtml(html: string, supervision) {
    const now = moment();
    const parsedHtml = html
      .replace('{{hari}}', now.locale("id").format('dddd'))
      .replace('{{tanggal}}', now.locale("id").format('DD'))
      .replace('{{bulan}}', now.locale("id").format('M'))
      .replace('{{tahun}}', now.locale("id").format('yyyy'))
      .replace('{{namaPemohon}}', supervision.user.name)
      .replace('{{sumurKe}}', supervision.sumurKe.toString())
      .replace('{{peruntukan}}', supervision.supervisionDetail.peruntukan)
      .replace(
        '{{detailLokasiSumur}}',
        supervision.supervisionDetail.alamatSumur,
      )
      .replace('{{desa}}', supervision.supervisionDetail.desa)
      .replace('{{kecamatan}}', supervision.supervisionDetail.kecamatan)
      .replace('{{kabupaten}}', supervision.supervisionDetail.kabupaten)
      .replace('{{provinsi}}', supervision.supervisionDetail.provinsi)
      .replace('{{koordX}}', '')
      .replace('{{koordY}}', '')
      .replace('{{koordZ}}', '')
      .replace(
        '{{ks}}',
        supervision.supervisionDetail.kedalamanSumur.toString(),
      )
      .replace(
        '{{ks}}',
        supervision.supervisionDetail.kedalamanSumur.toString(),
      )
      .replace(
        '{{ks}}',
        supervision.supervisionDetail.kedalamanSumur.toString(),
      )
      .replace(
        '{{dlb1a}}',
        supervision.supervisionDetail.diameterLubangBor1A.toString(),
      )
      .replace(
        '{{dlb1b}}',
        supervision.supervisionDetail.diameterLubangBor1B.toString(),
      )
      .replace(
        '{{dlb2a}}',
        supervision.supervisionDetail.diameterLubangBor2A.toString(),
      )
      .replace(
        '{{dlb2b}}',
        supervision.supervisionDetail.diameterLubangBor2B.toString(),
      )
      .replace(
        '{{wp1a}}',
        supervision.supervisionDetail.waktuPengeboranPHA.toString(),
      )
      .replace(
        '{{wp1b}}',
        supervision.supervisionDetail.waktuPengeboranPHB.toString(),
      )
      .replace(
        '{{wp2a}}',
        supervision.supervisionDetail.waktuPengeboranRHA.toString(),
      )
      .replace(
        '{{wp2b}}',
        supervision.supervisionDetail.waktuPengeboranRHB.toString(),
      )
      .replace(
        '{{wl}}',
        supervision.supervisionDetail.waterLoss ? 'Ada' : 'Tidak Ada',
      )
      .replace(
        '{{lmr}}',
        supervision.supervisionDetail.lubangMudahRuntuh ? 'Ada' : 'Tidak Ada',
      )
      .replace(
        '{{kk}}',
        supervision.supervisionDetail.kedalamanKontruksi.toString(),
      )
      .replace(
        '{{kmat}}',
        supervision.supervisionDetail.kedalamanMAT.toString(),
      )
      .replace(
        '{{catatanPengeboran}}',
        supervision.supervisionDetail.catatanPengeboran,
      )
      .replace(
        '{{dptpu1}}',
        supervision.supervisionWellSpec.diameterTotalPipaUkur.toString(),
      )
      .replace(
        '{{dptpu2}}',
        supervision.supervisionWellSpec.diameterTotalPipa.toString(),
      )
      .replace(
        '{{jambang1}}',
        supervision.supervisionWellSpec.jambangStart.toString(),
      )
      .replace(
        '{{jambang2}}',
        supervision.supervisionWellSpec.jambangEnd.toString(),
      )
      .replace(
        '{{pipascreenhtml}}',
        supervision.supervisionScreenPipe
          .map(
            (r) =>
              `<li>
              <div class="form-item-page-2-pipa-screen-item">
                <span>:</span>
                <span>${r.start}</span>
                <span>s.d</span>
                <span>${r.end}</span>
                <span>m</span>
              </div>
            </li>`,
          )
          .join(''),
      )
      .replace(
        '{{tkk}}',
        supervision.supervisionWellSpec.totalKedalamanKontruksi.toString(),
      )
      .replace(
        '{{gravel1}}',
        supervision.supervisionWellSpec.gravelStart.toString(),
      )
      .replace(
        '{{gravel2}}',
        supervision.supervisionWellSpec.gravelEnd.toString(),
      )
      .replace(
        '{{gravel1}}',
        supervision.supervisionWellSpec.gravelStart.toString(),
      )
      .replace(
        '{{gravel2}}',
        supervision.supervisionWellSpec.gravelEnd.toString(),
      )
      .replace(
        '{{lempung1}}',
        supervision.supervisionWellSpec.lempungStart.toString(),
      )
      .replace(
        '{{lempung2}}',
        supervision.supervisionWellSpec.lempungEnd.toString(),
      )
      .replace(
        '{{lempung1}}',
        supervision.supervisionWellSpec.lempungStart.toString(),
      )
      .replace(
        '{{lempung2}}',
        supervision.supervisionWellSpec.lempungEnd.toString(),
      )
      .replace(
        '{{semen1}}',
        supervision.supervisionWellSpec.penyemenanStart.toString(),
      )
      .replace(
        '{{semen2}}',
        supervision.supervisionWellSpec.penyemenanEnd.toString(),
      )
      .replace(
        '{{semen1}}',
        supervision.supervisionWellSpec.penyemenanStart.toString(),
      )
      .replace(
        '{{semen2}}',
        supervision.supervisionWellSpec.penyemenanEnd.toString(),
      )
      .replace(
        '{{diameterpipanaik}}',
        supervision.supervisionWellSpec.diameterPipaNaik.toString(),
      )
      .replace(
        '{{panjangpipanaik}}',
        supervision.supervisionWellSpec.panjangPipaNaik.toString(),
      )
      .replace(
        '{{panjangpipanaik}}',
        supervision.supervisionWellSpec.panjangPipaNaik.toString(),
      )
      .replace(
        '{{catatanWell}}',
        supervision.supervisionWellSpec.catatanWellSpec,
      )
      .replace('{{company}}', supervision.user.companyName)
      .replace(
        '{{korlap}}',
        supervision.supervisionRequirement.fieldCoordinator,
      )
      .replace('{{jurubor}}', supervision.supervisionRequirement.juruBor)
      .replace(
        '{{wellsite}}',
        supervision.supervisionRequirement.wellsiteGeologist,
      )
      .replace(
        '{{teams}}',
        supervision.supervisionRequirement.teams
          .split(',')
          .map((r) => '<li><span>' + r + '</span></li>')
          .join(''),
      )
      .replace(
        '{{posisiscreens}}',
        supervision.supervisionScreenPipe
          .map((r) => `${r.start}-${r.end}`)
          .join(','),
      )
      .replace(
        '{{akuivers}}',
        supervision.supervisionScreenAkuifer
          .map((r) => `${r.start}-${r.end}`)
          .join(','),
      )
      .replace(
        '{{fotopengawasan}}',
        supervision.supervisionPhotos
          .filter((r) => r.tag === 'SITUASI_PENGAWASAN')
          .map((r) => {
            return `<div class="container-photo">
        <img class="photo-grid-item" src="${r.photoUrl}" />
        <div class="bottom-right">
          <div>Coordinate: </div>
          <div>Caption: ${r.caption}</div>
        </div>
      </div>`;
          })
          .join(''),
      )
      .replace(
        '{{fotoperalatan}}',
        supervision.supervisionPhotos
          .filter((r) => r.tag === 'PERALATAN')
          .map(
            (r) => `<div class="container-photo">
        <img class="photo-grid-item" src="${r.photoUrl}" />
        <div class="bottom-right">
          <div>Coordinate: </div>
          <div>Caption: ${r.caption}</div>
        </div>
      </div>`,
          )
          .join(''),
      )
      .replace(
        '{{fotospoelbak}}',
        supervision.supervisionPhotos
          .filter((r) => r.tag === 'SPOEL')
          .map(
            (r) => `<div class="container-photo">
        <img class="photo-grid-item" src="${r.photoUrl}" />
        <div class="bottom-right">
          <div>Coordinate: </div>
          <div>Caption: ${r.caption}</div>
        </div>
      </div>`,
          )
          .join(''),
      )
      .replace(
        '{{fotocutting}}',
        supervision.supervisionPhotos
          .filter((r) => r.tag === 'CUTTING')
          .map(
            (r) => `<div class="container-photo">
        <img class="photo-grid-item" src="${r.photoUrl}" />
        <div class="bottom-right">
          <div>Coordinate: </div>
          <div>Caption: ${r.caption}</div>
        </div>
      </div>`,
          )
          .join(''),
      )
      .replace(
        '{{fotopipajauh}}',
        supervision.supervisionPhotos
          .filter((r) => r.tag === 'PIPA_JAUH')
          .map(
            (r) => `<div class="container-photo">
        <img class="photo-grid-item" src="${r.photoUrl}" />
        <div class="bottom-right">
          <div>Coordinate: </div>
          <div>Caption: ${r.caption}</div>
        </div>
      </div>`,
          )
          .join(''),
      )
      .replace(
        '{{fotopipadekat}}',
        supervision.supervisionPhotos
          .filter((r) => r.tag === 'PIPA_DEKAT')
          .map(
            (r) => `<div class="container-photo">
        <img class="photo-grid-item" src="${r.photoUrl}" />
        <div class="bottom-right">
          <div>Coordinate: </div>
          <div>Caption: ${r.caption}</div>
        </div>
      </div>`,
          )
          .join(''),
      )
      .replace(
        '{{fotolainnya}}',
        supervision.supervisionPhotos
        .filter((r) => r.tag === 'OTHERS')
        .map(
            (r) => `<div class="container-photo">
        <img class="photo-grid-item" src="${r.photoUrl}" />
        <div class="bottom-right">
          <div>Coordinate: </div>
          <div>Caption: ${r.caption}</div>
        </div>
      </div>`
          )
          .join(''),
      );

    return parsedHtml;
  }

  calcPosFromLatLonRad(lat,lon,radius){
  
    const phi   = (90-lat)*(Math.PI/180);
    const theta = (lon+180)*(Math.PI/180);

    const x = -(radius * Math.sin(phi)*Math.cos(theta));
    const z = (radius * Math.sin(phi)*Math.sin(theta));
    const y = (radius * Math.cos(phi));
  
    return [x,y,z];
  }
}
