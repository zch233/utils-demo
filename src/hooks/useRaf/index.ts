import { inBrowser } from '../utils';

interface UseRafOptions {
    interval?: number;
    isLoop?: boolean;
    isSync?: boolean;
}

/**
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/hooks/useRaf.html
 */
export function useRaf(fn: FrameRequestCallback, options?: UseRafOptions): () => void {
    if (inBrowser) {
        const { interval = 0, isLoop = false, isSync = false } = options || {};
        let start: number;
        let isStopped = false;
        let rafId: number;

        const stop = () => {
            isStopped = true;
            cancelAnimationFrame(rafId);
        };
        const frameWrapper = (timestamp: number) => {
            if (isStopped) return;
            let fnResult!: Promise<any> | void;
            if (start === undefined) {
                start = timestamp;
            } else if (timestamp - start > interval) {
                fnResult = fn(timestamp);
                start = timestamp;
                if (!isLoop) {
                    stop();
                    return;
                }
            }
            if (isSync && fnResult && fnResult?.then) {
                fnResult.then(() => {
                    rafId = requestAnimationFrame(frameWrapper);
                });
            } else {
                rafId = requestAnimationFrame(frameWrapper);
            }
        };
        rafId = requestAnimationFrame(frameWrapper);

        return stop;
    }
    return () => {};
}
