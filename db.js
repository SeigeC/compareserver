const mongoose = require("mongoose");
if (process.argv.length != 4) {
  process.exit(1);
}
const conn = mongoose.connect(
  process.argv[3],
  {
    useUnifiedTopology: true,
  },
  function (err) {
    if (err) {
      process.exit(1);
    }
  }
);

const Schema = mongoose.Schema;

const logSchema = new Schema({
  _id: String,
  request: String,
  response: String,
  replayed_response: String,
  all: [String],
  ip: String,
  path: String,
  start_time: Number,
  abnormal: Boolean,
});

const log = mongoose.model("log", logSchema);

module.exports = {
  log,
  conn,
};
