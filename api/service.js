import pdf from 'html-pdf';

const options = {
  format: 'Letter',
  orientation: 'portrait',
  type: 'pdf',
  zoomFactor: '0.65',
};

export default {
  async htmlToPdf(content) {
    try {
      return new Promise((resolve, reject) => {
        pdf.create(content, options).toBuffer((err, buffer) => {
          if (err) {
            reject(err);
          } else {
            resolve(buffer);
          }
        });
      });
    } catch (err) {
      throw new Error(err);
    }
  },
};
