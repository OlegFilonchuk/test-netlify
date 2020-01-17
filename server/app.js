const express = require('express');
const next = require('next');
const sitemap = require('./sitemap');

const dev = process.env.NODE_ENV !== 'production';

const port = process.env.PORT || 3000;
const ROOT_URL = dev
  ? `http://localhost:${port}`
  : 'https://admiring-raman-475f9a.netlify.com';

const app = next({ dev });
const handle = app.getRequestHandler();

// Nextjs's server prepared
app.prepare().then(async () => {
  const server = express();

  await sitemap({ server });

  await server.get('*', (req, res) => handle(req, res));

  // starting express server
  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on ${ROOT_URL}`) // eslint-disable-line no-console
  })
});
