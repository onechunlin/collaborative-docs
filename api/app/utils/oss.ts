import OSS = require("ali-oss");
import { Application } from "egg";

let client: null | OSS = null;

export const ossClientFactory = (app: Application)=>{
    if(client) {
        return client;
    }
    const { AccessKey, AccessSecret } = app.config.oss || {};
    if(!AccessKey) {
        app.logger.error("[utils oss] auth error accessKey undefimed")
        return
    }
    const AliOssClient = new OSS({  
        // 存储区域名称 华东1（杭州）。
        region: 'oss-cn-hangzhou',
        accessKeyId: AccessKey,
        accessKeySecret: AccessSecret,
        // Bucket名称
        bucket: 'co-docs',
    });
    client = AliOssClient;
    return client;
}
