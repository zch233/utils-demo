import { describe, expect, it } from 'vitest';
import { base64ToFile } from '../src';

describe('base64ToFile', () => {
    it('将base64字符串转换为文件', () => {
        // Arrange
        const base64String = 'data:application/octet-stream;base64,SGVsbG8gd29ybGQh';
        const expectedFileName = 'testFileName';
        // Act
        const resultFile = base64ToFile(base64String, expectedFileName);
        // 断言字符串是否与正则表达式或字符串匹配。
        expect(resultFile.name).toMatch(expectedFileName);
        expect(resultFile.type).toMatch('application/octet-stream');
    });
    it('当未提供文件名时，生成一个以时间戳作为名称的文件', () => {
        // Arrange
        const base64String = 'data:application/octet-stream;base64,SGVsbG8gd29ybGQh';
        // Act
        const resultFile = base64ToFile(base64String);
        // 断言
        expect(resultFile.name).toMatch(/^\d+$/); // matches a timestamp
        expect(resultFile.type).toMatch('application/octet-stream');
    });
});
