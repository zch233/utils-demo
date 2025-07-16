import { describe, expect, it } from 'vitest';
import { getBrowsers } from '../src';

describe('getBrowsers functionality', () => {
    it('应返回具有正确属性的对象', () => {
        const result = getBrowsers();
        //检查每种浏览器类型
        expect(typeof result.trident).toBe('boolean');
        expect(typeof result.presto).toBe('boolean');
        expect(typeof result.webKit).toBe('boolean');
        expect(typeof result.gecko).toBe('boolean');
        expect(typeof result.mobile).toBe('boolean');
        expect(typeof result.ios).toBe('boolean');
        expect(typeof result.android).toBe('boolean');
        expect(typeof result.iPhone).toBe('boolean');
        expect(typeof result.iPad).toBe('boolean');
        expect(typeof result.dingTalk).toBe('boolean');
        expect(typeof result.alipay).toBe('boolean');
        expect(typeof result.alipayMini).toBe('boolean');
        expect(typeof result.wechat).toBe('boolean');
        expect(typeof result.wechatMini).toBe('boolean');
        expect(typeof result.webApp).toBe('boolean');
        expect(typeof result.dtDreamApp).toBe('boolean');
        expect(typeof result.taurusApp).toBe('boolean');
        expect(result).toEqual({
            alipay: false,
            alipayMini: false,
            android: false,
            dingTalk: false,
            dtDreamApp: false,
            gecko: false,
            iPad: false,
            iPhone: false,
            ios: false,
            mobile: false,
            presto: false,
            taurusApp: false,
            trident: false,
            webApp: true,
            webKit: true,
            wechat: false,
            wechatMini: false,
        });
        expect(result.webKit).toBe(true);
    });
});
