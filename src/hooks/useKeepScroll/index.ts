import { onActivated, ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

/**
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/utils/hooks/useKeepScroll.html
 */
export const useKeepScroll = (el?: any) => {
    const scrollTop = ref<number[]>([]);
    const elArr: HTMLElement[] = [].concat(el).filter(Boolean);
    onActivated(() => {
        elArr.forEach((el, index) => {
            el.scrollTop = scrollTop.value[index];
        });
    });

    onBeforeRouteLeave((to, from, next) => {
        elArr.forEach((el, index) => {
            scrollTop.value[index] = el?.scrollTop ?? 0;
        });
        next();
    });
};
