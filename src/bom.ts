import queryString from 'query-string';

/**
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/bom.html#getparams
 */
export const getParams = (key?: string, href?: string | URL, isHash?: boolean) => {
    const realURL = new URL(href || window.location.href);
    const params = queryString.parse(isHash ? realURL.hash.replace(/.*(?=\?)/, '') : realURL.search);
    return key ? params[key] : params;
};

/**
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/bom.html#geturlparams
 */
export const getURLParams = (key?: string, href?: string | URL) => getParams(key, href);

/**
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/bom.html#geturlhashparams
 */
export const getURLHashParams = (key?: string, href?: string | URL) => getParams(key, href, true);

/**
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/bom.html#getbrowsers
 */
export const getBrowsers = () => {
    const u = navigator.userAgent;
    return {
        //移动终端浏览器版本信息
        trident: u.includes('Trident'), // IE内核
        presto: u.includes('Presto'), // opera内核
        webKit: u.includes('AppleWebKit'), // 苹果、谷歌内核
        gecko: u.includes('Gecko') && !u.includes('KHTML'), // 火狐内核
        mobile: !!/AppleWebKit.*Mobile.*/.test(u), // 是否为移动终端
        ios: !!/\(i[^;]+;( U;)? CPU.+Mac OS X/.test(u), // ios终端
        android: u.includes('Android') || u.includes('Linux'), // android终端或者uc浏览器
        iPhone: u.includes('iPhone'), // 是否为iPhone或者QQHD浏览器
        iPad: u.includes('iPad'), // 是否iPad
        dingTalk: u.includes('DingTalk'), // 是否为钉钉内部
        alipay: u.includes('AlipayClient'), // 是否为支付宝
        alipayMini: u.toLowerCase().includes('miniprogram') && u.toLowerCase().includes('alipay'), // 支付宝小程序
        wechat: /micromessenger/i.test(u), // 是否微信中
        wechatMini: u.toLowerCase().includes('miniprogram/wx') || (<any>window).__wxjs_environment === 'miniprogram', // 是否微信小程序中
        webApp: !u.includes('Safari'), // 是否web应该程序，没有头部与底部
        dtDreamApp: u.toLowerCase().includes('dtdreamweb'), // 浙里办 APP
        taurusApp: u.includes('TaurusApp'), // 是否为专有钉钉和浙政钉钉
        ykbapp: u.toLowerCase().includes('ykbapp'), // 是否愉快办 APP
    };
};

/**
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/bom.html#isInIframe
 */
export const isInIframe = () => window.frames.length !== window.parent.frames.length;

/**
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/bom.html#isInMicroApp
 */
// @ts-expect-error window __MICRO_APP_ENVIRONMENT__
export const isInMicroApp = (): boolean => window.__MICRO_APP_ENVIRONMENT__;
