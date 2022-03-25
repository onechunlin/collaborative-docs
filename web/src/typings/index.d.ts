interface Window {
    userInfo: {
        username: string;
        avatar?: string;
    };
    md5: (value: string, token?: string) => string;
}

type TUserInfo = {
    username: string;
    password: string;
    phoneNumber: number;
    avatar?: string;
}

type TErrorObject = {
    key: string;
    msg: string;
}

type TValidate = {
    [name: string]: {
        status: 'success' | 'warning' | 'error' | 'validating' | '',
        msg: string;
    }
}

type TApiResponse = {
    status: number;
    msg?: string;
    data?: any;
    errors?: TErrorObject[]
}