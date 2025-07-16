import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { openLink } from '../src';

describe('openLink function', () => {
    let mockOpen: any;
    beforeEach(() => {
        mockOpen = vi.spyOn(window, 'open');
        mockOpen.mockImplementation(() => null);
    });
    afterEach(() => {
        mockOpen.mockRestore();
    });
    it('打开指定url', () => {
        const url = 'https://www.google.com';
        openLink(url);
        expect(mockOpen).toHaveBeenCalledWith(url, undefined, undefined);
    });

    it('打开指定url，传参target', () => {
        const url = 'https://www.google.com';
        const target = '_blank';
        openLink(url, target);
        expect(mockOpen).toHaveBeenCalledWith(url, target, undefined);
    });

    it('打开指定url，传参target、features', () => {
        const url = 'https://www.google.com';
        const target = '_blank';
        const features = 'location=yes,height=600,width=800,scrollbars=yes,status=yes';
        openLink(url, target, features);
        expect(mockOpen).toHaveBeenCalledWith(url, target, features);
    });
});
