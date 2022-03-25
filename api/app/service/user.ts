import { Service } from 'egg';

export default class User extends Service {

    /**
     * 检查用户名是否存在
     */
    public async existUserName(username: string) {
        const rsp = await this.ctx.model.User.find({ username });
        if (rsp.length > 0) {
            return true;
        }
        return false
    }
}
