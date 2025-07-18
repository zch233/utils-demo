import { isRef, onDeactivated, onUnmounted, unref, watch } from 'vue';
import { inBrowser } from '../utils';
import { useMountedOrActivated } from '../useMountedOrActivated';
import type { Ref, WatchStopHandle } from 'vue';

type TargetRef = EventTarget | Ref<EventTarget | undefined>;

export interface UseEventListenerOptions {
    target?: TargetRef;
    capture?: boolean;
    passive?: boolean;
}

export function useEventListener<K extends keyof DocumentEventMap>(
    type: K,
    listener: (event: DocumentEventMap[K]) => void,
    options?: UseEventListenerOptions
): () => void;
export function useEventListener(type: string, listener: EventListener, options?: UseEventListenerOptions): () => void;
export function useEventListener(type: string, listener: EventListener, options: UseEventListenerOptions = {}) {
    if (!inBrowser) {
        return;
    }

    const { target = window, passive = false, capture = false } = options;

    let cleaned = false;
    let attached: boolean;

    const add = (target?: TargetRef) => {
        if (cleaned) {
            return;
        }
        const element = unref(target);

        if (element && !attached) {
            element.addEventListener(type, listener, {
                capture,
                passive,
            });
            attached = true;
        }
    };

    const remove = (target?: TargetRef) => {
        if (cleaned) {
            return;
        }
        const element = unref(target);

        if (element && attached) {
            element.removeEventListener(type, listener, capture);
            attached = false;
        }
    };

    onUnmounted(() => remove(target));
    onDeactivated(() => remove(target));
    useMountedOrActivated(() => add(target));

    let stopWatch: WatchStopHandle;

    if (isRef(target)) {
        stopWatch = watch(target, (val, oldVal) => {
            remove(oldVal);
            add(val);
        });
    }

    /**
     * Clean up the event listener
     */
    return () => {
        stopWatch?.();
        remove(target);
        cleaned = true;
    };
}
