import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { useWindowSize } from '../src';

describe('useWindowSize function', () => {
    let width: number;
    let height: number;
    beforeAll(() => {
        width = globalThis.innerWidth;
        height = globalThis.innerHeight;
    });
    afterAll(() => {
        globalThis.innerWidth = width;
        globalThis.innerHeight = height;
    });
    it('should return current window size', async () => {
        const resizeWindow = (w: number, h: number) => {
            globalThis.innerWidth = w;
            globalThis.innerHeight = h;
            window.dispatchEvent(new Event('resize'));
        };
        const result = useWindowSize();
        expect(result.width.value).toBe(globalThis.innerWidth);
        expect(result.height.value).toBe(globalThis.innerHeight);
        resizeWindow(1024, 768);
        expect(result.width.value).toBe(1024);
        expect(result.height.value).toBe(768);
    });
});
