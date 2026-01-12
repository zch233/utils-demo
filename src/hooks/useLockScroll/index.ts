import { onBeforeUnmount, onDeactivated, watch } from 'vue';
import { preventDefault } from '../utils';
import { useTouch } from '../useTouch';
import { useMountedOrActivated } from '../useMountedOrActivated';
import { getScrollParent } from '../useScrollParent';
import type { Ref } from 'vue';

let totalLockCount = 0;

const BODY_LOCK_CLASS = 'van-overflow-hidden';

/**
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/hooks/useLockScroll.html
 */
export function useLockScroll(rootRef: Ref<HTMLElement | undefined>, shouldLock: () => boolean) {
    const touch = useTouch();
    const DIRECTION_UP = '01';
    const DIRECTION_DOWN = '10';

    const onTouchMove = (event: TouchEvent) => {
        touch.move(event);

        const direction = touch.deltaY.value > 0 ? DIRECTION_DOWN : DIRECTION_UP;
        const el = getScrollParent(event.target as Element, rootRef.value) as HTMLElement;
        const { scrollHeight, offsetHeight, scrollTop } = el;
        let status = '11';

        if (scrollTop === 0) {
            status = offsetHeight >= scrollHeight ? '00' : '01';
        } else if (scrollTop + offsetHeight >= scrollHeight) {
            status = '10';
        }

        if (status !== '11' && touch.isVertical() && !(Number.parseInt(status, 2) & Number.parseInt(direction, 2))) {
            preventDefault(event, true);
        }
    };

    const lock = () => {
        document.addEventListener('touchstart', touch.start);
        document.addEventListener('touchmove', onTouchMove, { passive: false });

        if (!totalLockCount) {
            document.body.classList.add(BODY_LOCK_CLASS);
        }

        totalLockCount++;
    };

    const unlock = () => {
        if (totalLockCount) {
            document.removeEventListener('touchstart', touch.start);
            document.removeEventListener('touchmove', onTouchMove);

            totalLockCount--;

            if (!totalLockCount) {
                document.body.classList.remove(BODY_LOCK_CLASS);
            }
        }
    };

    const init = () => shouldLock() && lock();

    const destroy = () => shouldLock() && unlock();

    useMountedOrActivated(init);
    onDeactivated(destroy);
    onBeforeUnmount(destroy);

    watch(shouldLock, value => {
        value ? lock() : unlock();
    });
}
