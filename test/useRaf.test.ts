import { describe, expect, it, vi } from 'vitest';
import { useRaf } from '../src';

describe('useRaf function test suites', () => {
    it('在间隔之后正确执行回调', async () => {
        const interval = 50;
        const fn = vi.fn();
        const stop = useRaf(fn, { interval, isLoop: false });
        await new Promise(resolve => {
            setTimeout(resolve, interval + 20); // 等待间隔通过
        });
        expect(fn).toHaveBeenCalledTimes(1);
        stop(); // 停止以避免副作用
    });
    it('使用isLoop等于true正确地循环回调', async () => {
        const interval = 20;
        const fn = vi.fn();
        const stop = useRaf(fn, { interval, isLoop: true });
        await new Promise(resolve => {
            setTimeout(resolve, interval * 3 + 10);
        });
        expect(fn).toHaveBeenCalledTimes(3);
        stop(); // 停止以避免副作用
    });
    it('should stop calling the callback after stop function invocation', async () => {
        const interval = 20;
        const fn = vi.fn();
        const stop = useRaf(fn, { interval, isLoop: true });
        await new Promise(resolve => setTimeout(resolve, interval * 2 + 10)); // Wait for 2*interval to pass
        stop();
        await new Promise(resolve => setTimeout(resolve, interval)); // Wait for 1*interval to pass
        expect(fn).toHaveBeenCalledTimes(2); // Ensure fn is not called any more times
    });
});
