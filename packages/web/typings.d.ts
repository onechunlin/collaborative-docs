declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

interface Window {
  userInfo: {
    /** 用户名 */
    username: string;
    /** 头像 */
    avatar?: string;
  };
  md5: (value: string, token?: string) => string;
}
