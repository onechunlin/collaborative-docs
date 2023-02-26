module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const MarkDownDocSchema = new Schema(
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
      // markdown 的文本
      content: String,
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

  return mongoose.model("MarkdownDoc", MarkDownDocSchema);
};
