import { describe, expect, it } from 'vitest';
import { getURLHashParams } from '../src';

describe('getURLHashParams function', () => {
    // 测试url
    const testUrl = 'https://example.com/#/?id=123&name=alice';

    it('在不带参数的情况下调用时，应以对象的形式返回所有查询参数', () => {
        const result = getURLHashParams(undefined, testUrl);
        expect(result).toEqual({ id: '123', name: 'alice' });
    });

    it('提供指定key时返回值', () => {
        const result = getURLHashParams('name', testUrl);
        expect(result).toBe('alice');
    });

    it('提供无效秘钥返回undefined', () => {
        const result = getURLHashParams('invalid', testUrl);
        expect(result).toBe(undefined);
    });

    it('提供空字符串返回所有参数', () => {
        const result = getURLHashParams('', testUrl);
        expect(result).toEqual({ id: '123', name: 'alice' });
    });
});
