const Koa = require("koa");
const static = require("koa-static");
const path = require("path");
const fs = require("fs");

const PORT = Number(process.env.PORT) || 3000;
const STATIC = process.env.STATIC || "../build";

const app = new Koa();

const staticPath = path.resolve(STATIC);
app.use(static(staticPath));

const indexHtml = fs.readFileSync(path.join(staticPath, "index.html"));
app.use((ctx) => {
  ctx.type = "text/html; charset=utf-8";
  ctx.body = indexHtml;
});

app.listen(PORT);
