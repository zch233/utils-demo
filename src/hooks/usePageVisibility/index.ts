import { ref } from 'vue';
import { inBrowser } from '../utils';
import type { Ref } from 'vue';

export type VisibilityState = 'hidden' | 'visible';

let visibility: Ref<VisibilityState>;

/**
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/utils/hooks/usePageVisibility.html
 */
export function usePageVisibility() {
    if (!visibility) {
        visibility = ref<VisibilityState>('visible');

        if (inBrowser) {
            const update = () => {
                visibility.value = document.hidden ? 'hidden' : 'visible';
            };

            update();
            window.addEventListener('visibilitychange', update);
        }
    }

    return visibility;
}
