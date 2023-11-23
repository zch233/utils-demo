import { lineString, featureCollection } from '@turf/turf';

// https://release.group-ds.com/dev-newbee-handbook/utils/screen.html#parseHexColor
export const parseHexColor = function (hexStr: string) {
    return hexStr.length === 4
        ? hexStr
              .substr(1)
              .split('')
              .map(function (s) {
                  return 0x11 * parseInt(s, 16);
              })
        : [hexStr.substr(1, 2), hexStr.substr(3, 2), hexStr.substr(5, 2)].map(function (s) {
              return parseInt(s, 16);
          });
};

// https://release.group-ds.com/dev-newbee-handbook/utils/screen.html#gradientColors
export const gradientColors = (start: string, end: string, steps: number, gamma: number) => {
    let i, j, ms, me;
    const output: any = [];
    const so: any = [];
    gamma = gamma || 1;
    const normalize = function (channel: number) {
        return Math.pow(channel / 255, gamma);
    };
    const pad = function (s: string) {
        return s.length === 1 ? '0' + s : s;
    };
    const _start = parseHexColor(start).map(normalize);
    const _end = parseHexColor(end).map(normalize);
    for (i = 0; i < steps; i++) {
        ms = i / (steps - 1);
        me = 1 - ms;
        for (j = 0; j < 3; j++) {
            so[j] = pad(Math.round(Math.pow(_start[j] * me + _end[j] * ms, 1 / gamma) * 255).toString(16));
        }
        output.push('#' + so.join(''));
    }
    return output;
};

// https://release.group-ds.com/dev-newbee-handbook/utils/screen.html#geoJson
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
                    coordinates: coordinates,
                },
            };
        }),
    };
};

// https://release.group-ds.com/dev-newbee-handbook/utils/screen.html#polygon2line
export const polygon2line = (geojson: Record<string, any>) => {
    function flatten(array: any[]) {
        return [].concat([], ...array);
    }

    function polygonToLineString(coordinates: any[], properties: any) {
        return coordinates.map(function (coordinates) {
            return lineString(coordinates, properties);
        });
    }

    function multiPolygonToLineString(coordinates: any[], properties: any) {
        return flatten(
            coordinates.map(function (coordinates) {
                return polygonToLineString(coordinates, properties);
            })
        );
    }

    function toLineString(feature: Record<string, any>) {
        const geometry = feature.geometry,
            properties = feature.properties;

        switch (geometry.type) {
            case 'Polygon':
                return polygonToLineString(geometry.coordinates, properties);
            case 'MultiPolygon':
                return multiPolygonToLineString(geometry.coordinates, properties);
            default:
                return feature;
        }
    }
    const features = geojson.features.map(toLineString);
    return featureCollection(flatten(features));
};
