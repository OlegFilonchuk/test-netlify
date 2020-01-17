const parseMd = require('front-matter-markdown');
const fs = require('fs');
const util = require('util');

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

const posts = async () => {

  const fileNames = await readdir(`${__dirname}/../content/blogPosts`, );

  const result = [];

  for await (let fileName of fileNames) {
    const fileContent = await readFile(`${__dirname}/../content/blogPosts/${fileName}`);
    const data = await parseMd(fileContent);

    result.push({
      name: data.title,
      slug: data.title
    })
  }

  return result
};

module.exports = posts;