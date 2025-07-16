// Import required dependencies
import { describe, expect, it } from 'vitest';
import { getMonthWeeks } from '../src';

// getMonthWeeks函数的测试
describe('getMonthWeeks function', () => {
    it('返回给定月份的正确周信息', () => {
        const result = getMonthWeeks('2023-03');
        expect(result).toBeInstanceOf(Array);
        expect(result[0]).toHaveProperty('key');
        expect(result[0]).toHaveProperty('start_time');
        expect(result[0]).toHaveProperty('end_time');
        expect(result[0]).toHaveProperty('active');
        expect(result.length).toBe(5);
    });
    it('未定义日期的返回', () => {
        const result = getMonthWeeks();
        expect(result).toBeInstanceOf(Array);
        expect(result[0]).toHaveProperty('key');
        expect(result[0]).toHaveProperty('start_time');
        expect(result[0]).toHaveProperty('end_time');
        expect(result[0]).toHaveProperty('active');
    });
});
