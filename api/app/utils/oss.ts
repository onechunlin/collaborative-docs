import OSS = require("ali-oss");
import { Application } from "egg";

let client: null | OSS = null;

export const ossClientFactory = (app: Application)=>{
    if(client) {
        return client;
    }
    const { AccessKey, AccessSecret } = app.config
    const AliOssClient = new OSS({  
        // 华东1（杭州）。
        region: 'oss-cn-hangzhou',
        // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
        accessKeyId: AccessKey,
        accessKeySecret: AccessSecret,
        // 填写Bucket名称，例如examplebucket。
        bucket: 'co-docs',
    });
    client = AliOssClient;
    return client;
}
