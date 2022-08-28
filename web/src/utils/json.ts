/**
 * 安全的 JSON.parse 操作
 * @export
 * @param {string} [str='{}'] 需要转化的字符串
 * @param {*} [defaultObj={}] 转换失败时默认的对象
 * @return {*}  {(Record<string, unknown> | Record<string, unknown>[])}
 */
export function safeParse(
  str: string,
  defaultObj = {},
): Record<string, unknown> | Record<string, unknown>[] {
  let obj = defaultObj;
  try {
    obj = JSON.parse(str);
  } catch (_err) {
    console.error(_err);
  }

  return obj;
}

/**
 * 安全的 JSON.stringify 操作
 * @export
 * @param {*} [obj={}] 需要转化的对象
 * @param {string} [defaultStr=''] 转换失败时默认的字符串
 * @return {*}  {string}
 */
export function safeStringify(
  obj: unknown | unknown[],
  defaultStr = '',
): string {
  let str = defaultStr;
  try {
    str = JSON.stringify(obj, undefined, 4);
  } catch (_err) {
    console.error(_err);
  }

  return str;
}
