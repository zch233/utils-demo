import { set } from 'lodash-es';
import type { AxiosResponse } from 'axios';

// https://release.group-ds.com/dev-newbee-handbook/utils/utils.html#base64ToFile
export const base64ToFile = (base64: string, filename?: string) => {
    let arr = base64.split(','),
        mime = arr[0].match(/:(.*?);/)?.[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename || Date.now().toString(), { type: mime });
};

// https://release.group-ds.com/dev-newbee-handbook/utils/utils.html#blobToFile
export const blobToFile = (blob: Blob, filename?: string, options?: FilePropertyBag) =>
    new File([blob], filename || Date.now().toString(), { type: blob.type, ...options });

// https://release.group-ds.com/dev-newbee-handbook/utils/utils.html#openLinkViaAnchor
export const openLinkViaAnchor = (url: string, anchorAttrs?: Record<string, any>) => {
    const anchor = document.createElement('a');
    const $body = document.body;
    anchor.href = url;
    anchor.style.display = 'none';
    if (anchorAttrs) Object.keys(anchorAttrs).map(key => set(anchor, key, anchorAttrs[key]));
    $body.appendChild(anchor);
    anchor.click();
    $body.removeChild(anchor);
};

// https://release.group-ds.com/dev-newbee-handbook/utils/utils.html#openLink
export const openLink = (url: string, target?: Record<string, any> | string, windowFeatures?: string) => {
    const windowOpen = window.open(url, typeof target === 'string' ? target : undefined, windowFeatures);
    if (windowOpen == null || typeof windowOpen === 'undefined') {
        openLinkViaAnchor(url, typeof target === 'string' ? { target } : target);
    }
};

// https://release.group-ds.com/dev-newbee-handbook/utils/utils.html#downloadWithBlob
export const downloadWithBlob = (_response: AxiosResponse | Blob, filename?: string) => {
    const blobData = (_response as AxiosResponse).data || _response;
    return new Promise((resolve, reject) => {
        if (blobData instanceof Blob) {
            const fileReader = new FileReader();
            fileReader.onload = function () {
                const blob = blobData;
                // 本地保存文件
                const url = window.URL.createObjectURL(blob) || window.webkitURL.createObjectURL(blob);
                // TODO：注意这里的 headers 用于获取文件名称，确保后台已经返回正确字段
                const _filename = (_response as AxiosResponse).headers?.['content-disposition']?.split('filename*=')?.[1]?.substr(7);
                openLinkViaAnchor(url, { download: decodeURIComponent(filename || _filename) });
                resolve(blobData);
            };
            fileReader.readAsText(blobData);
        } else {
            console.error('downloadWithBlob：非文件流响应');
            reject(_response);
        }
    });
};
