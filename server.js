const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// https://github.com/zeit/next.js/issues/5214#issuecomment-612788329
app.prepare().then(() => {
  createServer((req, res) => {
    if (req.url !== "/" && req.url.endsWith("/")) {
      app.render(req, res, req.url.slice(0, -1));
    } else {
      handle(req, res, parse(req.url, true));
    }
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${3000}`);
  });
});
