import { describe, expect, it, vi } from 'vitest';
import { downloadWithBlob } from '../src';
import type { AxiosResponse } from 'axios';

describe('downloadWithBlob function', () => {
    it('如果响应是Blob的实例，则返回promise并保存文件', async () => {
        const response: AxiosResponse = {
            data: new Blob(['Test data'], { type: 'text/plain' }),
            status: 200,
            statusText: 'OK',
            headers: { 'content-disposition': "attachment; filename*=UTF-8''Test.txt" },
            // @ts-expect-error any
            config: {},
        };
        window.URL.createObjectURL = vi.fn();
        await downloadWithBlob(response);
        expect(window.URL.createObjectURL).toHaveBeenCalledWith(response.data);
    });
    it('如果响应不是Blob的实例，rejects the promise', async () => {
        const response: AxiosResponse = {
            data: 'Invalid data',
            status: 200,
            statusText: 'OK',
            headers: {},
            // @ts-expect-error any
            config: {},
        };
        try {
            await downloadWithBlob(response as any);
        } catch (error) {
            expect(error).toBe(response);
        }
    });
});
