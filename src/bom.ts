import queryString from 'query-string';

// https://release.group-ds.com/dev-newbee-handbook/utils/utils.html#getParams
export const getParams = (key?: string, href?: string | URL, isHash?: boolean) => {
    const realURL = new URL(href || window.location.href);
    const params = queryString.parse(isHash ? realURL.hash.replace(/.*(?=\?)/, '') : realURL.search);
    return key ? params[key] : params;
};

// https://release.group-ds.com/dev-newbee-handbook/utils/utils.html#getURLParams
export const getURLParams = (key?: string, href?: string | URL) => getParams(key, href);

// https://release.group-ds.com/dev-newbee-handbook/utils/utils.html#getURLParams
export const getHashParams = (key?: string, href?: string | URL) => getParams(key, href, true);
