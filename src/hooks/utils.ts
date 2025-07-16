export const inBrowser = typeof window !== 'undefined';

export function raf(fn: FrameRequestCallback): number {
    return inBrowser ? requestAnimationFrame(fn) : -1;
}

export function cancelRaf(id: number) {
    if (inBrowser) {
        cancelAnimationFrame(id);
    }
}

// double raf for animation
export function doubleRaf(fn: FrameRequestCallback): void {
    raf(() => raf(fn));
}

/**
 * 任意类型的异步函数
 */
type AnyPromiseFunction = (...arg: any[]) => PromiseLike<any>;

/**
 * 任意类型的普通函数
 */
type AnyNormalFunction = (...arg: any[]) => any;

/**
 * 任意类型的函数
 */
export type AnyFunction = AnyNormalFunction | AnyPromiseFunction;

export const stopPropagation = (event: Event) => event.stopPropagation();

export function preventDefault(event: Event, isStopPropagation?: boolean) {
    /* istanbul ignore else */
    if (typeof event.cancelable !== 'boolean' || event.cancelable) {
        event.preventDefault();
    }

    if (isStopPropagation) {
        stopPropagation(event);
    }
}
