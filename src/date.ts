import dayjs from 'dayjs';

// https://release.group-ds.com/dev-newbee-handbook/utils/utils.html#getMonthWeekCount
export const getMonthWeekCount = (month?: string, fromStart = 1) => {
    // fromStart -> 定义周的第一天是周几,默认是周一
    // w -> 计算该月1号是周几,0是周日.
    const w = dayjs(month).day();
    // 该月的天数
    const d = dayjs(month).daysInMonth();
    // 根绝fromStart和w的结果,算出第一周有几天
    const firstWeekDays = w ? (7 + fromStart - w) % 7 : fromStart ? fromStart : 7 - fromStart;
    // 计算该月有几周
    return Math.ceil((d - firstWeekDays) / 7) + 1;
};

// https://release.group-ds.com/dev-newbee-handbook/utils/utils.html#getMonthWeeks
export const getMonthWeeks = (
    month?: string
): {
    key: string;
    start_time: string;
    end_time: string;
    active: boolean;
}[] => {
    const m = dayjs(month).format('YYYY-MM');
    const monthWeekCount = getMonthWeekCount(m);
    const monthFirstDayReal = dayjs(m).startOf('month');
    // dayjs默认一周是以周日开始，所以如果该月的第一天是周日，我们提前减一天再计算
    const monthFirstDay = monthFirstDayReal.day() === 0 ? monthFirstDayReal.add(-1, 'days') : monthFirstDayReal;
    const monthLastDay = dayjs(m).endOf('month');
    return [...Array(monthWeekCount).keys()].map(index => {
        const startTime = index === 0 ? monthFirstDayReal : dayjs(monthFirstDay).add(index, 'week').startOf('week').add(1, 'days');
        const endTime = index === monthWeekCount - 1 ? monthLastDay : dayjs(monthFirstDay).add(index, 'week').endOf('week').add(1, 'days');
        return {
            key: `${startTime.format('YYYY-MM-DD')}-${endTime.format('YYYY-MM-DD')}`,
            start_time: startTime.format('YYYY-MM-DD'),
            end_time: endTime.format('YYYY-MM-DD'),
            active: dayjs().isAfter(startTime) && dayjs().isBefore(endTime),
        };
    });
};
