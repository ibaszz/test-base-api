import { Injectable } from '@nestjs/common';
import { readdirSync, readFileSync } from 'fs';
import * as html_to_pdf from 'html-pdf-node';
import puppeteer from 'puppeteer';

@Injectable()
export class PDFService {
  async generatePemantauanPdf(): Promise<Buffer> {
    return new Promise((resolve) => {
      const options = { format: 'A4' };
      // Example of options with args //
      // let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };
      console.log(readdirSync('./'));
      const html = readFileSync('src/Common/helper/index.html').toString();
      console.log(html);
      const file = {
        content: html,
      };

      html_to_pdf.generatePdf(file, options).then((pdfBuffer) => {
        resolve(pdfBuffer);
      });
    });
  }

  async generatePemantauanPDFPuppeteer() {
    const browser = await puppeteer.launch();

    // Create a new page
    const page = await browser.newPage();

    const html = readFileSync('src/Common/helper/index.html', 'utf-8');

    await page.setContent(html);

    await page.emulateMediaType('print');

    return page.pdf({
      margin: { top: '0', left: '0' },
      printBackground: true,
      format: 'A4',
    });
  }
}
