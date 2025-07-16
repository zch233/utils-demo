/**
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/screen.html#parsehexcolor
 */
export const parseHexColor = function (hexStr: string) {
    return hexStr.length === 4
        ? hexStr
              .slice(1)
              .split('')
              .map(function (s) {
                  return 0x11 * Number.parseInt(s, 16);
              })
        : [hexStr.slice(1, 3), hexStr.slice(3, 5), hexStr.slice(5, 7)].map(function (s) {
              return Number.parseInt(s, 16);
          });
};

/**
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/screen.html#gradientcolors
 */
export const gradientColors = (start: string, end: string, steps: number, gamma: number) => {
    let i, j, ms, me;
    const output: any = [];
    const so: any = [];
    gamma = gamma || 1;
    const normalize = function (channel: number) {
        return (channel / 255) ** gamma;
    };
    const pad = function (s: string) {
        return s.length === 1 ? `0${s}` : s;
    };
    const _start = parseHexColor(start).map(normalize);
    const _end = parseHexColor(end).map(normalize);
    for (i = 0; i < steps; i++) {
        ms = i / (steps - 1);
        me = 1 - ms;
        for (j = 0; j < 3; j++) {
            so[j] = pad(Math.round((_start[j] * me + _end[j] * ms) ** (1 / gamma) * 255).toString(16));
        }
        output.push(`#${so.join('')}`);
    }
    return output;
};

/**
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/screen.html#geojson
 */
interface geoJson {
    coordinates: Array<any>;
    lnglat: Array<string | number>;
    code: number | string;
    name: string;
    label: string;
    value: number | string;
    level: number;
    children?: any[];
}
export const createGeoJson = (fetchData: Array<geoJson>) => {
    return {
        type: 'FeatureCollection',
        features: fetchData.map(o => {
            const { coordinates, lnglat, code, name, level, label, value, children } = o;
            return {
                type: 'Feature',
                properties: {
                    code: code || value,
                    name: name || label,
                    cp: lnglat,
                    level,
                    children: children || [],
                },
                geometry: {
                    type: 'MultiPolygon',
                    coordinates,
                },
            };
        }),
    };
};
