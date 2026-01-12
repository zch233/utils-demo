import { ref, watch } from 'vue';
import type { WatchSource } from 'vue';

/**
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/hooks/useLazyRender.html
 */
export function useLazyRender(show: WatchSource<boolean | undefined>) {
    const inited = ref(false);

    watch(
        show,
        value => {
            if (value) {
                inited.value = value;
            }
        },
        { immediate: true }
    );

    return (render: () => JSX.Element) => () => (inited.value ? render() : null);
}
