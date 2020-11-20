const { log } = require("./db");
const router = require("koa-router")();

router.post("/write", async (ctx) => {
  const type = ctx.request.body.type;
  const params = ctx.request.body;
  console.log(params);
  if (type === "1") {
    await log.create({
      _id: params.reqID,
      request: params.body,
      ip: params.ip,
      path: params.path,
      start_time: params.time,
      $push: { all: params.all },
    });
    ctx.response.body = "";
    return;
  }
  data = await log.findOne({ _id: params.reqID });
  if (type === "2") {
    let abnormal;
    if (data?.replayed_response) {
      abnormal = data.replayed_response === params.body;
    }
    await log.updateOne(
      {
        _id: params.reqID,
      },
      {
        $set: {
          abnormal,
          response: params.body,
        },
        $push: {
          all: params.all,
        },
      }
    );
    ctx.response.body = "";
    return;
  }
  let abnormal;
  if (data?.response) {
    abnormal = data.response === params.body;
  }
  await log.updateOne(
    {
      _id: params.reqID,
    },
    {
      $set: {
        abnormal,
        replayed_response: params.body,
      },
      $push: {
        all: params.all,
      },
    }
  );
  ctx.response.body = "";
});

module.exports = router;
