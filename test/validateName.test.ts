import { describe, expect, it } from 'vitest';
import { validateName } from '../src';

describe('validateName function', () => {
    it('unicode范围内的有效名称', () => {
        const validNameInUnicodeRange = '林毛樼陳亢亦';
        expect(validateName(validNameInUnicodeRange)).toBe(true);
    });

    it('带符号的无效姓名', () => {
        const validNameWithSymbol = '林●亢';
        expect(validateName(validNameWithSymbol)).toBe(false);
    });

    it('字数长度不符合', () => {
        const validNameByCharacterLimit = '王';
        expect(validateName(validNameByCharacterLimit)).toBe(false);
    });

    it('英文名', () => {
        const invalidName = 'Smith';
        expect(validateName(invalidName)).toBe(false);
    });

    it('超过字符长度限制的无效名称', () => {
        const invalidCharacterLimit = '张陈林李杨黄吴刘谢张洪林林林';
        expect(validateName(invalidCharacterLimit)).toBe(false);
    });

    it('特殊符号的姓名', () => {
        const invalidNameWithSymbols = '李@周';
        expect(validateName(invalidNameWithSymbols)).toBe(false);
    });
});
