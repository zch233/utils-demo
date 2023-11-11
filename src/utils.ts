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
