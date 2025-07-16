// Import the necessary modules
import { describe, expect, test } from 'vitest';
import { getParams } from '../src';

describe('getParams function', () => {
    // 测试用例: 获取所有参数
    test('在未提供key时返回所有参数', () => {
        const url = new URL('https://test.com?param1=test1&param2=test2');
        const result = getParams(undefined, url);
        const expectedResult = {
            param1: 'test1',
            param2: 'test2',
        };
        expect(result).toEqual(expectedResult);
    });

    test('返回指定key的值', () => {
        const url = new URL('https://test.com?param1=test1&param2=test2');
        const result = getParams('param1', url);
        expect(result).toBe('test1');
    });

    test('当isHash为true时，应从hash返回参数', () => {
        const url = new URL('https://test.com#param1=test1&param2=test2');
        const result = getParams(undefined, url, true);
        const expectedResult = {
            param1: 'test1',
            param2: 'test2',
        };
        expect(result).toEqual(expectedResult);
    });

    test('当不存在参数时应返回空对象', () => {
        const url = new URL('https://test.com');
        const result = getParams(undefined, url);
        const expectedResult = {};
        expect(result).toEqual(expectedResult);
    });
});
