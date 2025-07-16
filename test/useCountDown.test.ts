import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { useCountDown } from '../src';
import type { UseCountDownOptions } from '../src';

describe('useCountDown function', () => {
    it('it should start the countdown correctly', () => {
        mount({
            setup() {
                const options: UseCountDownOptions = {
                    time: 3000,
                    onChange: () => {},
                    onFinish: () => {},
                };
                const { start, current } = useCountDown(options);
                start();
                setTimeout(() => {
                    expect(current.value).toBeLessThan(3000);
                }, 1000);
                return () => {};
            },
        });
    });
    it('it should pause the countdown correctly', () => {
        mount({
            setup() {
                const options: UseCountDownOptions = {
                    time: 3000,
                    onChange: () => {},
                    onFinish: () => {},
                };
                const { start, pause, current } = useCountDown(options);
                start();
                setTimeout(() => {
                    pause();
                    const remainTimeAfterPause = current.value;
                    setTimeout(() => {
                        expect(current.value).toBe(remainTimeAfterPause);
                    }, 1000);
                }, 1000);
                return () => {};
            },
        });
    });
    it('it should reset the countdown correctly', () => {
        mount({
            setup() {
                const options: UseCountDownOptions = {
                    time: 3000,
                    onChange: () => {},
                    onFinish: () => {},
                };
                const { start, reset, current } = useCountDown(options);
                start();
                setTimeout(() => {
                    reset();
                    expect(current.value).toBe(3000);
                }, 1000);
                return () => {};
            },
        });
    });
    it('it should call onFinish when countdown ends', () => {
        mount({
            setup() {
                let isFinished = false;
                const options: UseCountDownOptions = {
                    time: 1000,
                    onChange: () => {},
                    onFinish: () => {
                        isFinished = true;
                    },
                };
                useCountDown(options);
                new Promise(resolve => setTimeout(resolve, 1100)).then(() => {
                    expect(isFinished).toBe(true);
                });
                return () => {};
            },
        });
    });
    it('Test if onChange gets called until it finish', () => {
        mount({
            setup() {
                const options: UseCountDownOptions = {
                    time: 3000,
                    onChange: vi.fn(),
                    onFinish: vi.fn(),
                };
                const countdown = useCountDown(options);
                countdown.start();
                new Promise(r => setTimeout(r, 2200)).then(() => {
                    expect(options.onChange).toHaveBeenCalledTimes(2);
                    expect(options.onFinish).toHaveBeenCalledTimes(1);
                });
                return () => {};
            },
        });
    });
    it('Test if it pauses correctly', () => {
        mount({
            setup() {
                const options: UseCountDownOptions = {
                    time: 3000,
                    onChange: vi.fn(),
                    onFinish: vi.fn(),
                };
                const countdown = useCountDown(options);
                countdown.start();
                setTimeout(() => countdown.pause(), 1000);
                new Promise(r => setTimeout(r, 2200)).then(() => {
                    expect(options.onChange).toHaveBeenCalledTimes(1);
                    expect(options.onFinish).toHaveBeenCalledTimes(0);
                });
                return () => {};
            },
        });
    });
    it('Test if it resets correctly', () => {
        mount({
            setup() {
                const options: UseCountDownOptions = {
                    time: 3000,
                    onChange: vi.fn(),
                    onFinish: vi.fn(),
                };
                const countdown = useCountDown(options);
                countdown.start();
                setTimeout(() => countdown.reset(), 1000);
                new Promise(r => setTimeout(r, 2200)).then(() => {
                    expect(options.onChange).toHaveBeenCalledTimes(0);
                    expect(options.onFinish).toHaveBeenCalledTimes(0);
                });
                return () => {};
            },
        });
    });
});
