let timer: NodeJS.Timeout;
/**
 * lodash 自身 debounce 最后会触发多次，所以这里自己写一个
 * @param fn
 * @param wait
 * @returns
 */
export default function debounce(fn: (...args: any) => any, wait: number) {
  return function () {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn, wait);
  };
}
