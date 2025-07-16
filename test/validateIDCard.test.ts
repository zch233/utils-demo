import { describe, expect, it } from 'vitest';
import { validateIDCard } from '../src';

describe('validateIDCard function', () => {
    it('有效身份证', () => {
        const validCard1 = '11010519491231002X';
        const validCard2 = '34052419800101001X';
        expect(validateIDCard(validCard1)).toBe(true);
        expect(validateIDCard(validCard2)).toBe(true);
    });

    it('城市代码无效的身份证应', () => {
        const invalidCityIDCard = '99010519491231002X';
        expect(validateIDCard(invalidCityIDCard)).toBe(false);
    });

    it('日期无效的身份证', () => {
        const invalidDateIDCard = '11010520991231002X';
        expect(validateIDCard(invalidDateIDCard)).toBe(false);
    });
});
