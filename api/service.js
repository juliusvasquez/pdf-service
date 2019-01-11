// import axios from 'axios';
import puppeteer from 'puppeteer';
import jsreportcore from 'jsreport-core';
import logger from '../lib/logger';
// import appConfig from '../conf/appConfig';

// const { domain, generate } = appConfig.services.pdfService;

export default {
  async webpageToPdf(url) {
    // Puppeteer can only generate pdf in headless mode.
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url); // Adjust network idle as required.
    const pdfConfig = {
      format: 'A4',
      printBackground: true,
      margin: {
        // Word's default A4 margins
        top: '2.54cm',
        bottom: '2.54cm',
        left: '2.54cm',
        right: '2.54cm',
      },
    };
    await page.emulateMedia('screen');

    // Return the pdf buffer. Useful for saving the file not to disk.
    const pdf = await page.pdf(pdfConfig);

    await browser.close();

    return pdf;
  },

  // async generateFromHTML(fileName, templates) {
  //   const pdfOptions = {
  //     ...templates,
  //     document: {
  //       format: 'A4',
  //       margin: {
  //         top: '10mm',
  //         bottom: '10mm',
  //         right: '5mm',
  //         left: '5mm',
  //       },
  //     },
  //   };

  //   const options = {
  //     method: 'POST',
  //     headers: { accept: 'application/pdf' },
  //     data: {
  //       fileName,
  //       options: pdfOptions,
  //     },
  //     url: `${domain}${generate}`,
  //     responseType: 'arraybuffer',
  //   };
  //   return axios(options);
  // },

  async htmlToPdf(template) {
    try {
      // return new Promise((resolve, reject) => {
      // pdf.create(content, options).toBuffer((err, buffer) => {
      //   if (err) {
      //     reject(err);
      //   } else {
      //     resolve(buffer);
      //   }
      // });

      // Destructure the pdf options
      // This will be used by puppeeter
      const { header, footer, content } = template;

      const jsreport = jsreportcore(
        {
          allowLocalFileAccess: true,
          maxBuffer: 10240000000000000000000000000000,
          execOptions: {
            maxBuffer: 102400000000000000000000000000,
          },
        },
        {
          execOptions: {
            maxBuffer: 102400000000000000000000000000,
          },
        },
      );

      await jsreport.init();

      const render = await jsreport.render({
        template: {
          header,
          footer,
          content:
            '<!DOCTYPE html> <html itemscope="" itemtype="http://schema.org/WebPage" lang="en-PH"> <head> <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" /> <meta content="/images/branding/googleg/1x/googleg_standard_color_128dp.png" itemprop="image" /> <title>Google</title> </head> <body bgcolor="#fff"> <div id="mngb"> <div id="gbar"> <nobr ><b class="gb1">Search</b> <a class="gb1" href="http://www.google.com.ph/imghp?hl=en&tab=wi" >Images</a > <a class="gb1" href="http://maps.google.com.ph/maps?hl=en&tab=wl" >Maps</a > <a class="gb1" href="https://play.google.com/?hl=en&tab=w8">Play</a> <a class="gb1" href="http://www.youtube.com/?gl=PH&tab=w1">YouTube</a> <a class="gb1" href="http://news.google.com.ph/nwshp?hl=en&tab=wn" >News</a > <a class="gb1" href="https://mail.google.com/mail/?tab=wm">Gmail</a> <a class="gb1" href="https://drive.google.com/?tab=wo">Drive</a> <a class="gb1" style="text-decoration:none" href="https://www.google.com.ph/intl/en/about/products?tab=wh" ><u>More</u> &raquo;</a ></nobr > </div> <div id="guser" width="100%"> <nobr ><span id="gbn" class="gbi"></span><span id="gbf" class="gbf"></span ><span id="gbe"></span ><a href="http://www.google.com.ph/history/optout?hl=en" class="gb4" >Web History</a > | <a href="/preferences?hl=en" class="gb4">Settings</a> | <a target="_top" id="gb_70" href="https://accounts.google.com/ServiceLogin?hl=en&passive=true&continue=http://www.google.com/" class="gb4" >Sign in</a ></nobr > </div> <div class="gbh" style="left:0"></div> <div class="gbh" style="right:0"></div> </div> <center> <br clear="all" id="lgpd" /> <div id="lga"> <img alt="Google" height="92" src="/images/branding/googlelogo/1x/googlelogo_white_background_color_272x92dp.png" style="padding:28px 0 14px" width="272" id="hplogo" onload="window.lol&&lol()" /><br /><br /> </div> <form action="/search" name="f"> <table cellpadding="0" cellspacing="0"> <tr valign="top"> <td width="25%">&nbsp;</td> <td align="center" nowrap=""> <input name="ie" value="ISO-8859-1" type="hidden" /><input value="en-PH" name="hl" type="hidden" /><input name="source" type="hidden" value="hp" /><input name="biw" type="hidden" /><input name="bih" type="hidden" /> <div class="ds" style="height:32px;margin:4px 0"> <input style="color:#000;margin:0;padding:5px 8px 0 6px;vertical-align:top" autocomplete="off" class="lst" value="" title="Google Search" maxlength="2048" name="q" size="57" /> </div> <br style="line-height:0" /><span class="ds" ><span class="lsbb" ><input class="lsb" value="Google Search" name="btnG" type="submit"/></span></span ><span class="ds" ><span class="lsbb" ><input class="lsb" value="I\'m Feeling Lucky" name="btnI" onclick="if(this.form.q.value)this.checked=1; else top.location=\'/doodles/\'" type="submit"/></span ></span> </td> <td class="fl sblc" align="left" nowrap="" width="25%"> <a href="/advanced_search?hl=en-PH&amp;authuser=0" >Advanced search</a ><a href="/language_tools?hl=en-PH&amp;authuser=0" >Language tools</a > </td> </tr> </table> </form> <div id="gac_scont"></div> <div style="font-size:83%;min-height:3.5em"> <br /> <div id="gws-output-pages-elements-homepage_additional_languages__als"> <style> #gws-output-pages-elements-homepage_additional_languages__als { font-size: small; margin-bottom: 24px; } #SIvCob { display: inline-block; line-height: 28px; } #SIvCob a { padding: 0 3px; } .H6sW5 { display: inline-block; margin: 0 2px; white-space: nowrap; } .z4hgWe { display: inline-block; margin: 0 2px; } </style> <div id="SIvCob"> Google offered in: <a href="http://www.google.com/setprefs?sig=0_xYDmbZOD01DCBcQf5WWn5PZyZUc%3D&amp;hl=fil&amp;source=homepage&amp;sa=X&amp;ved=0ahUKEwjmuYXDtOXfAhUBd94KHcH2AzAQ2ZgBCAU" >Filipino</a > <a href="http://www.google.com/setprefs?sig=0_xYDmbZOD01DCBcQf5WWn5PZyZUc%3D&amp;hl=ceb&amp;source=homepage&amp;sa=X&amp;ved=0ahUKEwjmuYXDtOXfAhUBd94KHcH2AzAQ2ZgBCAY" >Cebuano</a > </div> </div> </div> <span id="footer"> <div style="font-size:10pt"> <div style="margin:19px auto;text-align:center" id="fll"> <a href="/intl/en/ads/">Advertising�Programs</a ><a href="http://www.google.com.ph/intl/en/services/" >Business Solutions</a ><a href="/intl/en/about.html">About Google</a ><a href="http://www.google.com/setprefdomain?prefdom=PH&amp;prev=http://www.google.com.ph/&amp;sig=K_7y5MFnRvUdKcINVYouoL66RgCL8%3D" >Google.com.ph</a > </div> </div> <p style="color:#767676;font-size:8pt"> &copy; 2019 - <a href="/intl/en/policies/privacy/">Privacy</a> - <a href="/intl/en/policies/terms/">Terms</a> </p> </span> </center> </body> </html>',
          engine: 'handlebars',
          recipe: 'wkhtmltopdf',
          execOptions: {
            maxBuffer: 1024000000000000000,
          },
          wkhtmltopdf: {
            execOptions: {
              maxBuffer: 1024000000000000000,
            },
            maxBuffer: 60000000,
            pageSize: 'A4',
            orientation: 'portrait',
            marginBottom: '30mm',
            headerHeight: '20',
            footerHeight: '20',
            dpi: 300,
          },
        },
      });

      return render.content;

      // const page = await browser.newPage();
      // await page.setContent(content);

      // // Generate PDF and return its buffer
      // const pdfBuffer = await page.pdf({
      //   printBackground: true,
      //   width,
      //   height,
      //   format,
      //   landscape,
      //   margin,
      //   displayHeaderFooter: true,
      //   headerTemplate: header === '' ? '&nbsp;' : header,
      //   footerTemplate: footer === '' ? '&nbsp;' : footer,
      // });

      // browser.close();
    } catch (err) {
      logger.error(`Error on html to pdf ${err.message}`);
      throw new Error(err.message);
    }
  },
};
