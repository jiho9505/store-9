const fs = require('fs');
const path = require('path');

const inputDir = path.resolve(__dirname, process.argv[2]);
const outputDir = path.resolve(__dirname, prodcess.argv[3]) || inputDir;

fs.readdir(inputDir, (err, files) => {
  if (err) return console.log(err);

  files.forEach((file, index) => {
    const filePath = path.resolve(inputDir, file);

    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) return console.log('error');

      const outputPath = path.resolve(outputDir, `store-${index}.txt`);

      const datas = JSON.parse(data).data;

      const querys = datas.map((data) => {
        const name = data.title;
        let price = Number(data.price.replaceAll(',', ''));
        const thumbnail = data.image;
        const stock = 1000000;
        const content_urls = data.content_urls.join(';');

        if (Number.isNaN(price)) price = 0;

        return makeString({ name, price, thumbnail, stock, content_urls });
      });

      fs.writeFile(outputPath, querys.join('\n'), 'utf-8', (err) => {
        if (err) return console.log(err);
      });
    });
  });
});

const makeString = ({ name, price, thumbnail, stock, content_urls }) =>
  `insert into products (name, price, thumbnail, stock, content, category_id) value ('${name}', ${price}, '${thumbnail}', ${stock}, '${content_urls}');`;
