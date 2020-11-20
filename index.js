const koa = new (require("koa"))();
const BodyParser = require("koa-bodyparser");
const router = require("./router");

koa.use(BodyParser());

koa.use(router.routes());
koa.listen(process.argv[2]);
