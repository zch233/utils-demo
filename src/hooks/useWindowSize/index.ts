import { ref } from 'vue';
import { inBrowser } from '../utils';
import type { Ref } from 'vue';

let width: Ref<number>;
let height: Ref<number>;

/**
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/hooks/useWindowSize.html
 */
export function useWindowSize() {
    if (!width) {
        width = ref(0);
        height = ref(0);

        if (inBrowser) {
            const update = () => {
                width.value = window.innerWidth;
                height.value = window.innerHeight;
            };

            update();
            window.addEventListener('resize', update, { passive: true });
            window.addEventListener('orientationchange', update, { passive: true });
        }
    }

    return { width, height };
}
