const fs = require('fs');
const util = require('util');

const readdir = util.promisify(fs.readdir);

const posts = async () => {

  const files = await readdir(`${__dirname}/../content/blogPosts`, );

  return files.map((item) => ({
    name: item,
    slug: item
  }))
};

module.exports = posts;