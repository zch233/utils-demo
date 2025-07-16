import { describe, expect, it } from 'vitest';
import { blobToFile } from '../src';

describe('blobToFile', () => {
    it('从给定Blob实例创建文件实例', async () => {
        // Create a Blob instance
        const blob = new Blob([''], { type: 'text/html' });
        const filename = 'example.txt';
        // Bold to File
        const file = blobToFile(blob, filename);

        expect(file).toBeInstanceOf(File);
        expect(file.name).toBe(filename);
        expect(file.type).toBe(blob.type);
    });

    it('未提供，则使用当前时间戳作为文件名', async () => {
        // Create a Blob instance
        const blob = new Blob([''], { type: 'text/html' });
        // Bold to File
        const file = blobToFile(blob);
        // Verify the returned File has a name that is a valid number (timestamp)
        expect(Number(file.name)).not.toBeNaN();
        // or another assert
        expect(file.name).toMatch(/^\d+$/); // matches a timestamp
        expect(file.type).toBe(blob.type);
    });

    it('正确的为File实例指定可选属性', async () => {
        // Create a Blob instance
        const blob = new Blob([''], { type: 'text/html' });
        const filename = 'example.txt';
        const lastModified = Date.now();
        // Bold to File
        const file = blobToFile(blob, filename, { lastModified });

        expect(file.lastModified).toBe(lastModified);
    });
});
