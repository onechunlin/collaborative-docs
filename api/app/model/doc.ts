module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const DocSchema = new Schema(
    {
      // 文档名称
      title: {
        type: String,
        index: true,
        required: true,
      },
      // 文档创建人
      creator: {
        type: String,
        index: true,
        required: true,
      },
      // 正文内容
      content: [{}],
      // 当前文档信息编辑人
      editingUser: String,
      // 将更新时间和创建时间存为 unix 时间戳
      createdAt: Number,
      updatedAt: Number,
    },
    {
      timestamps: {
        currentTime: () => Math.floor(Date.now() / 1000),
      },
    }
  );

  return mongoose.model("Doc", DocSchema);
};
