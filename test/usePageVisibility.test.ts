import { describe, expect, it } from 'vitest';
import { usePageVisibility } from '../src';

describe('usePageVisibility function', () => {
    it('在页面可见时返回可见性状态', async () => {
        const visibility = usePageVisibility();
        expect(typeof visibility.value).toBe('string');
    });
});
