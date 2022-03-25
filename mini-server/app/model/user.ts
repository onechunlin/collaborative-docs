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
    },
        {
            timestamps: true
        });

    return mongoose.model('User', UserSchema);
}
