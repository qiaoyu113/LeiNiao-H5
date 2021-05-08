import Vue from 'vue';
const isServer = Vue.prototype.$isServer;
/**
 * 获取dom元素size和position信息
 * @param el    HTMLElement
 * @return {object}
 */
export function getRect(el) {
    if (el instanceof window.SVGElement) {
        let rect = el.getBoundingClientRect();
        return {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height
        }
    } else {
        return {
            top: el.offsetTop,
            left: el.offsetLeft,
            width: el.offsetWidth,
            height: el.offsetHeight
        }
    }
}

/**
 * 设置指定元素的style
 * 
 * @param el    HTMLElement
 * @param {object} styleObject
 */
export function setStyle(el, styleObject = {}) {
    for (let prop in styleObject) {
        if (!styleObject.hasOwnProperty(prop)) continue;
        el.style[prop] = styleObject[prop];
    }
}
const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;

function camelCase(name) {
    return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter;
    }).replace(MOZ_HACK_REGEXP, 'Moz$1');
}
// getStyle
export function getStyle(element, styleName) {
    if (!element || !styleName) return null;
    styleName = camelCase(styleName);
    if (styleName === 'float') {
        styleName = 'cssFloat';
    }
    try {
        const computed = document.defaultView.getComputedStyle(element, '');
        return element.style[styleName] || computed ? computed[styleName] : null;
    } catch (e) {
        return element.style[styleName];
    }
}


/**
 * 获取document宽、高、滚动条等信息
 */
export function getDocumentRect() {
    let {
        documentElement,
        body
    } = document;

    const clientWidth = documentElement.clientWidth || body.clientWidth;
    const clientHeight = documentElement.clientHeight || body.clientHeight;
    const scrollTop = documentElement.scrollTop || body.scrollTop;
    const scrollHeight = documentElement.scrollHeight || body.scrollHeight;

    return {
        clientWidth,
        clientHeight,
        scrollTop,
        scrollHeight
    }
}
/**
 * 获取DOM元素的offset信息
 *
 * @param target
 * @return {{top: number, left: number}}
 */
export function getOffset(target) {
    let offset = {
        top: 0,
        left: 0
    };

    let offsetParent = target.offsetParent;

    offset.top += target.offsetTop;
    offset.left += target.offsetLeft;

    for (; offsetParent !== null;) {
        offset.top += offsetParent.offsetTop;
        offset.left += offsetParent.offsetLeft;
        offsetParent = offsetParent.offsetParent;
    }

    return offset;
}

/* istanbul ignore next */
export const on = (function () {
    if (!isServer && document.addEventListener) {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false);
            }
        };
    } else {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler);
            }
        };
    }
})();

/* istanbul ignore next */
export const off = (function () {
    if (!isServer && document.removeEventListener) {
        return function (element, event, handler) {
            if (element && event) {
                element.removeEventListener(event, handler, false);
            }
        };
    } else {
        return function (element, event, handler) {
            if (element && event) {
                element.detachEvent('on' + event, handler);
            }
        };
    }
})();
