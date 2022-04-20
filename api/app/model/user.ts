module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const UserSchema = new Schema({
        username: {
            type: String,
            unique: true,
            index: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        avatar: {
            type: String
        },
        // 将更新时间和创建时间存为 unix 时间戳
        createdAt: Number,
        updatedAt: Number,
    },
    {
        timestamps: {
            currentTime: () => Math.floor(Date.now() / 1000)
        }
    });

    return mongoose.model('User', UserSchema);
}
