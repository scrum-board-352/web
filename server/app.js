const Koa = require("koa");
const staticFiles = require("koa-static-cache");
const path = require("path");
const fs = require("fs");

const PORT = Number(process.env.PORT) || 3000;
const STATIC_PATH = path.join(__dirname, "build");

const app = new Koa();

app.use(
  staticFiles({
    dir: STATIC_PATH,
    buffer: true,
    gzip: true,
    usePrecompiledGzip: true,
  })
);

const indexHtml = fs.readFileSync(path.join(STATIC_PATH, "index.html"));
app.use((ctx) => {
  ctx.type = "text/html; charset=utf-8";
  ctx.body = indexHtml;
});

app.listen(PORT);
