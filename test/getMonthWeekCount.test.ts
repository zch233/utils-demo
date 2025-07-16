import { describe, expect, it } from 'vitest';
import { getMonthWeekCount } from '../src';

/**
 * 测试getMonthWeekCount函数
 */
describe('getMonthWeekCount function tests', () => {
    it('fromStart默认参数测试', async () => {
        const res = getMonthWeekCount('2023-12');
        expect(res).toBe(5); // 2023年12月从周一开始有5周时间
    });
    it('fromStart传参测试', async () => {
        const res = getMonthWeekCount('2023-12', 2); // 将星期二定义为一周的开始
        expect(res).toBe(5); //2023年12月从周二开始有5周时间
    });
});
