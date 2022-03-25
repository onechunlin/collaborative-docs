import { Controller, Context } from 'egg';
import { omit } from 'lodash';

const NoNeedLoginPath = ['/login', '/register'];

type TErrorObject = {
    key: string;
    msg: string;
}

const DefaultAvatar = 'https://pic3.zhimg.com/80/v2-eccfdf25fac8a5193850657df5c49aff_720w.jpg?source=1940ef5c';

export default class HomeController extends Controller {
    /**
     * 返回用户信息脚本，若已登录则返回用户信息，否则跳转到登录页面
     */
    public async userInfo(ctx: Context) {
        const { userInfo } = ctx.session;
        const { referer } = ctx.request.header;
        ctx.response.set('Content-Type', 'application/javascript');

        const noNeedLogin = NoNeedLoginPath.find(path => (referer as string).match(path));

        // 判断当前用户是否登录，如果登录了设置用户信息，否则跳转到登录页面
        if (userInfo) {
            ctx.body = `window.userInfo = ${JSON.stringify(userInfo)}`
        } else if (noNeedLogin) {
            // 如果是登录和注册路由，直接 return
            ctx.body = '';
            return;
        } else {
            ctx.body = `location.href = location.origin + '/login'`;
        }
    }

    /**
     * 登录接口
     */
    public async login(ctx: Context) {
        const { username, password } = ctx.request.body;

        // 查询帐号是否存在
        const existUserName = await ctx.service.user.existUserName(username);

        if (existUserName) {
            // 如果用户名存在则检查密码是否正确
            const res = await ctx.model.User.findOne({ username }).lean();
            const { password: rightPassword } = res;
            if (password === rightPassword) {
                const userInfo = omit(res, 'password', '_id', '__v')
                ctx.session.userInfo = userInfo;
                ctx.body = {
                    status: 0,
                    msg: '登录成功',
                    data: {
                        userInfo
                    }
                }
            } else {
                const errors: TErrorObject[] = [{
                    key: 'password',
                    msg: '密码错误'
                }];
                ctx.body = {
                    status: 400,
                    errors,
                }
            }

        } else {
            const errors: TErrorObject[] = [{
                key: 'username',
                msg: '帐号不存在'
            }];

            ctx.body = {
                status: 400,
                errors,
            }
        }
    }

    /**
     * 退出登录接口
     */
    public async logout(ctx: Context) {
        const { session } = ctx;
        if (session) {
            ctx.session = null;
            ctx.body = {
                status: 0,
                msg: '退出成功！'
            };
        }
    }

    /**
    * 注册接口
    */
    public async register(ctx: Context) {
        const { username, password, phoneNumber } = ctx.request.body;

        // 查询帐号是否存在
        const existUserName = await ctx.service.user.existUserName(username);

        if (existUserName) {
            const errors: TErrorObject[] = [{
                key: 'username',
                msg: '帐号已存在'
            }];

            ctx.body = {
                status: 500,
                errors,
            }
            return;
        }

        await ctx.model.User.create({ username, password, phoneNumber, avatar: DefaultAvatar })
            .then(() => {
                ctx.body = {
                    status: 0,
                    msg: '注册成功'
                }
            }).catch(e => {
                console.error(e);
                ctx.status = 500;
                ctx.body = {
                    status: 500,
                    msg: e
                }
            });
    }
}
