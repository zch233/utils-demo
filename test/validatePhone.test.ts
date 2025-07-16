import { describe, expect, it } from 'vitest';
import { validatePhone } from '../src';

describe('validatePhone function', () => {
    it('有效手机号', () => {
        const result = validatePhone('13912345678');
        expect(result).toBe(true);
    });
    it('无效手机号', () => {
        const result = validatePhone('23912345678');
        expect(result).toBe(false);
    });
});
