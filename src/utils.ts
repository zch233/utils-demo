import { set } from 'lodash-unified';
import type { AxiosResponse } from 'axios';

/**
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/utils.html#base64tofile
 */
export const base64ToFile = (base64: string, filename?: string) => {
    const arr = base64.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename || Date.now().toString(), { type: mime });
};

/**
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/utils.html#blobtofile
 */
export const blobToFile = (blob: Blob, filename?: string, options?: FilePropertyBag) =>
    new File([blob], filename || Date.now().toString(), { type: blob.type, ...options });

/**
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/utils.html#openlinkviaanchor
 */
export const openLinkViaAnchor = (url: string, anchorAttrs?: Record<string, any>) => {
    const anchor = document.createElement('a');
    anchor.href = url;
    if (anchorAttrs) Object.keys(anchorAttrs).map(key => set(anchor, key, anchorAttrs[key]));
    anchor.click();
    anchor.remove();
};

/**
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/utils.html#openlink
 */
export const openLink = (url: string, target?: Record<string, any> | string, windowFeatures?: string) => {
    const windowOpen = window.open(url, typeof target === 'string' ? target : undefined, windowFeatures);
    if (windowOpen == null || typeof windowOpen === 'undefined') {
        openLinkViaAnchor(url, typeof target === 'string' ? { target } : target);
    }
};

/**
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/utils.html#downloadwithblob
 */
interface DownloadWithBlob {
    (_response: AxiosResponse, filename?: string): void;
    (_response: Blob, filename: string): void;
}
export const downloadWithBlob: DownloadWithBlob = (_response, filename) => {
    const blobData = (_response as AxiosResponse).data || _response;
    return new Promise((resolve, reject) => {
        if (blobData instanceof Blob) {
            const fileReader = new FileReader();
            fileReader.addEventListener('load', function () {
                const blob = blobData;
                // 本地保存文件
                const url = window.URL.createObjectURL(blob) || window.webkitURL?.createObjectURL(blob);
                // TODO：注意这里的 headers 用于获取文件名称，确保后台已经返回正确字段
                const _filename = (_response as AxiosResponse).headers?.['content-disposition']?.split('filename*=')?.[1]?.slice(7);
                openLinkViaAnchor(url, { download: decodeURIComponent(filename || _filename) });
                window.URL.revokeObjectURL(url);
                resolve(blobData);
            });
            fileReader.readAsText(blobData);
        } else {
            console.error('downloadWithBlob：非文件流响应');
            reject(_response);
        }
    });
};

/**
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/utils.html#stringtohex
 */
export const stringToHex = (str: string) => str.split('').reduce((res, v, i) => res + str.charCodeAt(i).toString(16), '');

/**
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/utils.html#stringtobin
 */
export const stringToBin = (str: string) =>
    String.fromCharCode.apply(
        String,
        str
            .split(/(.{2})/)
            .filter(Boolean)
            .reduce((res, v) => res.concat(Number.parseInt(v, 16)), [] as number[])
    );

/**
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/utils.html#numbertochinese
 */
export const numberToChinese = (str: number | string): string => {
    let num: number = Number(str);
    const chineseNums: string[] = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    const unitChars: string[] = ['', '十', '百', '千', '万'];

    if (num === 0 || Number.isNaN(num)) {
        return chineseNums[0];
    }

    let result: string = '';
    let unitIndex: number = 0;
    let needZero: boolean = false;

    while (num > 0) {
        const digit: number = num % 10;
        if (digit !== 0) {
            result = chineseNums[digit] + unitChars[unitIndex] + result;
            needZero = false;
        } else {
            if (!needZero) {
                result = chineseNums[digit] + result;
                needZero = true;
            }
        }

        num = Math.floor(num / 10);
        unitIndex++;
    }

    // 处理特殊情况：如果结果以"一十"开头，去掉前面的"一"
    result = result.startsWith('一十') ? result.substring(1) : result;
    // 处理特殊情况：如果结果以"零"结尾，去掉后面的"零"
    result = result.endsWith('零') ? result.substring(0, result.length - 1) : result;

    return result;
};

/**
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/utils.html#measuretext
 */
export class MeasureText {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor(font: string = '14px Microsoft YaHei') {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d')!;
        this.context.font = font;
    }

    getWidth(text: string): number {
        const metrics = this.context.measureText(text);
        return metrics.width;
    }
}

/**
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/utils.html#array2keyobject
 */
interface Item {
    [key: string]: any;
}

interface KeyedObject<T> {
    [key: string]: T;
}
export const array2KeyObject = <T extends Item>(originalArray: T[] = [], key: keyof T = 'code', value?: keyof T): KeyedObject<T> | KeyedObject<any> => {
    return originalArray.reduce((acc: KeyedObject<T> | KeyedObject<any>, item: T) => {
        if (!item || !item[key]) return acc;
        if (value) {
            acc[item[key] as string] = item[value];
        } else {
            acc[item[key] as string] = item;
        }
        return acc;
    }, {});
};

/**
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/utils.html#btoa2
 */
export const btoa2 = (text: string) => btoa(String.fromCharCode(...new TextEncoder().encode(text)));

/**
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/utils.html#atob2
 */
export const atob2 = (text: string) => new TextDecoder().decode(Uint8Array.from(atob(text), c => c.charCodeAt(0)));

/**
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/utils.html#desensitizationphone
 */
export const desensitizationPhone = (phone: string) => phone && phone.toString().replace(/(.{3}).*(.{4})/, '$1***$2');

/**
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/utils.html#desensitizationidcard
 */
export const desensitizationIDCard = (cardNo: string) => {
    if (!cardNo) return cardNo;
    const prefix = cardNo.slice(0, 6); // 获取前三位身份证号
    const suffix = cardNo.slice(-4); // 获取后四位身份证号
    // 生成中间部分的脱敏字符，长度与原身份证号中间部分相同
    const mask = '*'.repeat(cardNo.length - 10);
    return `${prefix}${mask}${suffix}`;
};

/**
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/utils.html#desensitizationname
 */
export const desensitizationName = (name: string) => {
    if (name.length <= 1 || !name) {
        return name;
    }
    if (name.length === 2) {
        return `${name.slice(0, 1)}*`; // 如果字符串长度为2，返回第一个字符加一个星号
    }
    const firstChar = name.slice(0, 1); // 获取首字符
    const lastChar = name.slice(-1); // 获取尾字符
    const maskedLength = name.length - 2; // 计算中间部分长度
    return `${firstChar}${'*'.repeat(maskedLength)}${lastChar}`;
};

/**
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/utils.html#desensitizationinfo
 */
const isNumberString = (str: string): boolean => /^\d+$/.test(str.trim());

export const desensitizationInfo = (str: string) => {
    const strLength = str?.length ?? 0;
    if (!str) return str;
    if (strLength === 11 && isNumberString(str)) {
        return desensitizationPhone(str);
    } else if ((strLength === 15 && isNumberString(str)) || (strLength === 18 && (isNumberString(str) || str.includes('X')))) {
        return desensitizationIDCard(str);
    } else {
        return desensitizationName(str);
    }
};
/**
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/utils.html#getCssVariable
 */
export const getCssVariable = (variable = '--color-master'): string => String(getComputedStyle(document.documentElement).getPropertyValue(variable)).trim();

/**
 * 获取原始类型
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/utils.html#getPrimitiveType
 */
type PrimitiveType =
    | 'undefined'
    | 'null'
    | 'boolean'
    | 'number'
    | 'string'
    | 'symbol'
    | 'bigint'
    | 'object'
    | 'array'
    | 'function'
    | 'date'
    | 'regexp'
    | 'error'
    | 'map'
    | 'set'
    | 'weakmap'
    | 'weakset'
    | 'arraybuffer'
    | 'dataview'
    | 'promise'
    | 'generator'
    | 'generatorfunction'
    | 'asyncfunction'
    | 'proxy';
export const getPrimitiveType = (value: any): PrimitiveType =>
    /\[object (\w+)]/.exec(Object.prototype.toString.call(value))![1].toLocaleLowerCase() as PrimitiveType;
