import { onBeforeUnmount, onDeactivated } from 'vue';
import { inBrowser } from '../utils';
import { useMountedOrActivated } from '../useMountedOrActivated';
import type { Ref } from 'vue';

/**
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/hooks/useVisibilityChange.html
 */
export function useVisibilityChange(target: Ref<Element | undefined>, onChange: (visible: boolean) => void) {
    // compatibility: https://caniuse.com/#feat=intersectionobserver
    if (!inBrowser || !window.IntersectionObserver) {
        return;
    }

    const observer = new IntersectionObserver(
        entries => {
            // visibility changed
            onChange(entries[0].intersectionRatio > 0);
        },
        { root: document.body }
    );

    const observe = () => {
        if (target.value) {
            observer.observe(target.value);
        }
    };

    const unobserve = () => {
        if (target.value) {
            observer.unobserve(target.value);
        }
    };

    onDeactivated(unobserve);
    onBeforeUnmount(unobserve);
    useMountedOrActivated(observe);
}
