const koa = new (require("koa"))();
const BodyParser = require("koa-bodyparser");
const router = require("./router");

koa.use(BodyParser());

koa.use(async function (ctx, next) {
  try {
    await next();
  } catch (e) {
    ctx.status = 500;
  }
  if (parseInt(ctx.status) === 404) {
    console.log("ping");
    ctx.body = "pong";
  }
});

koa.use(router.routes());
koa.listen(process.argv[2]);
