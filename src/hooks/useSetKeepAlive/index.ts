import { nextTick, ref } from 'vue';

/**
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/hooks/useSetKeepAlive.html
 */
export function useRouteCache(include: string[] = []) {
    const caches = ref<string[]>([]);

    // 默认值
    if (include.length > 0) caches.value = caches.value.concat(include);
    // 添加缓存的路由组件
    function addCache(componentName: string | string[]) {
        if (Array.isArray(componentName)) {
            componentName.forEach(addCache);
            return;
        }

        if (!componentName || caches.value.includes(componentName)) return;

        caches.value.push(componentName);
    }

    // 移除缓存的路由组件
    function removeCache(componentName: string) {
        const index = caches.value.indexOf(componentName);
        if (index > -1) {
            return caches.value.splice(index, 1);
        }
    }

    // 移除缓存的路由组件的实例
    async function removeCacheEntry(componentName: string) {
        if (removeCache(componentName)) {
            await nextTick();
            addCache(componentName);
        }
    }

    return {
        caches,
        addCache,
        removeCache,
        removeCacheEntry,
    };
}
