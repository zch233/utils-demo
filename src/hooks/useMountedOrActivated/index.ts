import { nextTick, onActivated, onMounted } from 'vue';
import type { AnyFunction } from '../utils';

/**
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/utils/hooks/useMountedOrActivated.html
 */
export function useMountedOrActivated(callback: AnyFunction, onlyActivated?: boolean) {
    let mounted: boolean;

    onMounted(() => {
        if (!onlyActivated) callback();
        nextTick(() => {
            mounted = true;
        });
    });

    onActivated(() => {
        if (mounted) {
            callback();
        }
    });
}
