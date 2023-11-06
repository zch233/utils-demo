export const base64toFile = (base64: string, filename?: string) => {
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