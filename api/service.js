import jsreportcore from 'jsreport-core';

export default {
  async htmlToPdf(options) {
    try {
      const {
        header,
        footer,
        content,
        document: {
          landscape, width, height, format, margin,
        },
      } = options;

      const jsreport = jsreportcore();

      await jsreport.init();

      const render = await jsreport.render({
        template: {
          content,
          engine: 'handlebars',
          recipe: 'wkhtmltopdf',
          wkhtmltopdf: {
            pageSize: 'A4',
            orientation: 'portrait',
            marginBottom: '30mm',
            header:
              "<!DOCTYPE html> <html><head></head><body> Page <span id='page'></span> of <span id='topage'></span> <script> var vars={}; var x=window.location.search.substring(1).split('&'); for (var i in x) {var z=x[i].split('=',2);vars[z[0]] = unescape(z[1]);} document.getElementById('page').innerHTML = vars.page; document.getElementById('topage').innerHTML = vars.topage; </script> </body></html>",
            footer:
              "<!DOCTYPE html> <html><head></head><body> <span style='float:right'>Page <span id='page'></span> of <span id='topage'></span></span> <script> var vars={}; var x=window.location.search.substring(1).split('&'); for (var i in x) {var z=x[i].split('=',2);vars[z[0]] = unescape(z[1]);} document.getElementById('page').innerHTML = vars.page; document.getElementById('topage').innerHTML = vars.topage; </script> </body></html>",
            headerHeight: '20',
            footerHeight: '20',
            dpi: 300,
            cover:
              "<!DOCTYPE html> <html><head></head><body> Page <span id='page'></span> of <span id='topage'></span> <script> var vars={}; var x=window.location.search.substring(1).split('&'); for (var i in x) {var z=x[i].split('=',2);vars[z[0]] = unescape(z[1]);} document.getElementById('page').innerHTML = vars.page; document.getElementById('topage').innerHTML = vars.topage; </script> </body></html>",
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
      console.log(err);
      // browser.close();
      throw new Error(err);
    }
  },
};
