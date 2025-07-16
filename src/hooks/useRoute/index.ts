/**
 * Vue Router support
 */
import { type ComponentPublicInstance, type ExtractPropTypes, type PropType, getCurrentInstance } from 'vue';
import type { RouteLocationRaw } from 'vue-router';

export const routeProps = {
    to: [String, Object] as PropType<RouteLocationRaw>,
    url: String,
    replace: Boolean,
};

export type RouteProps = ExtractPropTypes<typeof routeProps>;

export function route({
    to,
    url,
    replace,
    // @ts-expect-error $router
    $router: router,
}: ComponentPublicInstance<RouteProps>) {
    if (to && router) {
        router[replace ? 'replace' : 'push'](to);
    } else if (url) {
        replace ? location.replace(url) : (location.href = url);
    }
}

export function useRoute() {
    const vm = getCurrentInstance()!.proxy as ComponentPublicInstance<RouteProps>;
    return () => route(vm);
}
