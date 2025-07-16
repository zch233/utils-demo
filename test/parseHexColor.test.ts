import { describe, expect, it } from 'vitest';
import { parseHexColor } from '../src';

describe('parseHexColor function', () => {
    it('短格式颜色', () => {
        const color = parseHexColor('#abc');
        expect(color).toEqual([0xaa, 0xbb, 0xcc]);
    });

    it('长格式颜色', () => {
        const color = parseHexColor('#aabbcc');
        expect(color).toEqual([0xaa, 0xbb, 0xcc]);
    });

    it('非彩色输入返回原始输入', () => {
        const color = parseHexColor('abcd');
        expect(color).toEqual([187, 204, 221]);
    });
});
