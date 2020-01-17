const sm = require('sitemap');
const posts = require('./posts');

const sitemap = sm.createSitemap({
  hostname: 'https://admiring-raman-475f9a.netlify.com',
  cacheTime: 600000, // 600 sec - cache purge period
});

const setup = async ({ server }) => {
  const Posts = await posts();

  for (let i = 0; i < Posts.length; i += 1) {
    const post = Posts[i];
    sitemap.add({
      url: `/posts/${post.slug}`,
      changefreq: 'daily',
      priority: 0.9,
    })
  }

  sitemap.add({
    url: '/a',
    changefreq: 'daily',
    priority: 1,
  });

  sitemap.add({
    url: '/b',
    changefreq: 'daily',
    priority: 1,
  });

  server.get('/sitemap.xml', (req, res) => {
    sitemap.toXML((err, xml) => {
      if (err) {
        res.status(500).end();
        return
      }

      res.header('Content-Type', 'application/xml');
      res.send(xml)
    })
  })
};

module.exports = setup;
