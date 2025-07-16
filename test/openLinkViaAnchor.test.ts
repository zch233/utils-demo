import { describe, expect, it, vi } from 'vitest';
import { openLinkViaAnchor } from '../src';

describe('openLinkViaAnchor function', () => {
    it('测试openLinkViaAnchor的功能', () => {
        const url = 'http://localhost';
        const anchorAttrs = { target: '_blank', rel: 'noopener noreferrer' };
        const tempLink = document.createElement('a');

        tempLink.href = url;
        tempLink.target = anchorAttrs.target;
        tempLink.rel = anchorAttrs.rel;
        document.createElement = vi.fn(() => tempLink);
        document.body.append = vi.fn();
        tempLink.remove = vi.fn();

        openLinkViaAnchor(url, anchorAttrs);

        expect(document.createElement).toHaveBeenCalledWith('a');
        expect(document.body.append).toHaveBeenCalledWith(tempLink);
        expect(tempLink.remove).toHaveBeenCalled();
    });
});
