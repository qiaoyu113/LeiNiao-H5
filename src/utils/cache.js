/**
 * 存储localStorage
 */
export const setStorage = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
export const getStorage = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
};

/**
 * 删除localStorage
 */
export const removeStorage = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
};

/**
 * 存储sessionStorage
 */
export const setSession = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.sessionStorage.setItem(name, content);
};

/**
 * 获取sessionStorage
 */
export const getSession = name => {
  if (!name) return;
  return window.sessionStorage.getItem(name);
};

/**
 * 删除sessionStorage
 */
export const removeSession = name => {
  if (!name) return;
  window.sessionStorage.removeItem(name);
};

/**
 * 存储Cookie
 */
export const setCookie = (name, value) => {
  if (!name) return;
  const curDate = new Date();
  // 当前时间戳
  const curTamp = curDate.getTime();
  // 当前日期
  const curDay = curDate.toLocaleDateString();
  let curWeeHours = 0;
  if (navigator.userAgent.indexOf('Safari') !== -1) {
  // 当日凌晨的时间戳,减去一毫秒是为了防止后续得到的时间不会达到00:00:00的状态
    curWeeHours = new Date(curDay).getTime() + (8 * 60 * 60 * 1000) - 1;
  } else {
    curWeeHours = new Date(curDay).getTime() - 1;
  }
  // 当日已经过去的时间（毫秒）
  const passedTamp = curTamp - curWeeHours;
  // 当日剩余时间
  const leftTamp = 24 * 60 * 60 * 1000 - passedTamp;
  const leftTime = new Date();
  leftTime.setTime(leftTamp + curTamp);
  // 创建cookie
  document.cookie = name + '=' + value + ';expires=' + leftTime.toGMTString() + ';path=/';
};

/**
 * 获取Cookie
 */
export const getCookie = key => {
  const reg = RegExp('(^| )' + key + '=([^;]+)(;|$)');
  const arr = document.cookie.match(reg);
  if (arr) {
    return decodeURIComponent(arr[2]);
  } else {
    return null;
  }
};

/**
 * 删除Cookie
 */
export const removeCookie = key => {
  const d = new Date();
  d.setTime(d.getTime() + (-1 * 24 * 60 * 60 * 1000));
  const expires = 'expires=' + d.toUTCString();
  document.cookie = key + '=' + '' + '; ' + expires + '; path=/';// path=/是根路径
};
