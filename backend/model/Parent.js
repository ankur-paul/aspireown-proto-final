const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ParentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Parent", ParentSchema);
