// @ts-nocheck
/**
 * insert-css
 * @param { Boolean }     replace   是否替换样式
 * @param { Boolean }     prepend   样式插入位置是否为节点之前
 * @param { HTMLElement } container 样式插入位置
 */

const containers = []; // will store container HTMLElement references
const styleElements: HTMLElement[] = []; // will store {prepend: HTMLElement, append: HTMLElement}
const usage = 'insert-css: You need to provide a CSS string. Usage: insertCSS(cssString[, options]).';

function createStyleElement() {
    const styleElement = document.createElement('style');
    styleElement.setAttribute('type', 'text/css');
    return styleElement;
}

export function insertCSS(css: string, options?: { replace?: boolean; prepend?: boolean; container?: HTMLElement }) {
    options = options || {};
    if (css === undefined) {
        throw new Error(usage);
    }
    const replace = options.replace;
    const position = options.prepend === true ? 'prepend' : 'append';
    const container = options.container !== undefined ? options.container : document.querySelector('head');
    let containerId = containers.indexOf(container);

    // first time we see this container, create the necessary entries
    if (containerId === -1) {
        containerId = containers.push(container) - 1;
        styleElements[containerId] = {};
    }

    // try to get the correponding container + position styleElement, create it otherwise
    let styleElement;
    if (styleElements[containerId] !== undefined && styleElements[containerId][position] !== undefined) {
        styleElement = styleElements[containerId][position];
    } else {
        styleElement = styleElements[containerId][position] = createStyleElement();
        if (position === 'prepend') {
            container.insertBefore(styleElement, container.childNodes[0]);
        } else {
            container.appendChild(styleElement);
        }
    }

    // strip potential UTF-8 BOM if css was read from a file
    if (css.charCodeAt(0) === 0xfeff) {
        css = css.substr(1, css.length);
    }

    // actually add the stylesheet
    if (styleElement.styleSheet) {
        replace ? (styleElement.styleSheet.cssText = css) : (styleElement.styleSheet.cssText += css);
    } else {
        replace ? (styleElement.textContent = css) : (styleElement.textContent += css);
    }

    return styleElement;
}
