/**
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/validate.html#validateidcard
 */
export const validateIDCard = (idCard: string) => {
    idCard = idCard.toString();
    const city: Record<number, string> = {
        11: '北京',
        12: '天津',
        13: '河北',
        14: '山西',
        15: '内蒙古',
        21: '辽宁',
        22: '吉林',
        23: '黑龙江',
        31: '上海',
        32: '江苏',
        33: '浙江',
        34: '安徽',
        35: '福建',
        36: '江西',
        37: '山东',
        41: '河南',
        42: '湖北',
        43: '湖南',
        44: '广东',
        45: '广西',
        46: '海南',
        50: '重庆',
        51: '四川',
        52: '贵州',
        53: '云南',
        54: '西藏',
        61: '陕西',
        62: '甘肃',
        63: '青海',
        64: '宁夏',
        65: '新疆',
        71: '台湾',
        81: '香港',
        82: '澳门',
        91: '国外',
    };
    let num = idCard.toUpperCase();
    if (!/(^\d{15}$)|(^\d{17}(\d|X)$)/.test(num)) {
        // throw '身份证位数错误！';
        return false;
    }
    if (city[Number.parseInt(num.substr(0, 2))] === undefined) {
        // throw '身份证格式错误！';
        return false;
    }
    const len = num.length;
    let re;
    if (len === 15) {
        re = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
        const arrSplit = num.match(re);
        const dtmBirth = new Date(`19${arrSplit?.[2]}/${arrSplit?.[3]}/${arrSplit?.[4]}`);
        const bGoodDay =
            // @ts-expect-error xxx
            dtmBirth.getYear() === Number(arrSplit?.[2]) && dtmBirth.getMonth() + 1 === Number(arrSplit?.[3]) && dtmBirth.getDate() === Number(arrSplit?.[4]);
        if (!bGoodDay) {
            // throw '身份证日期格式错误';
            return false;
        } else {
            const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            const arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
            let nTemp = 0;
            num = `${num.substr(0, 6)}19${num.substr(6, num.length - 6)}`;
            for (let i = 0; i < 14; i++) {
                nTemp += Number(num.substr(i, 1)) * arrInt[i];
            }
            num += arrCh[nTemp % 11];
            return true;
        }
    }
    if (len === 18) {
        re = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})(\d|X)$/;
        const arrSplit = num.match(re);
        const dtmBirth = new Date(`${arrSplit?.[2]}/${arrSplit?.[3]}/${arrSplit?.[4]}`);
        const bGoodDay =
            dtmBirth.getFullYear() === Number(arrSplit?.[2]) &&
            dtmBirth.getMonth() + 1 === Number(arrSplit?.[3]) &&
            dtmBirth.getDate() === Number(arrSplit?.[4]);
        if (!bGoodDay) {
            // throw '身份证日期格式错误';
            return false;
        } else {
            const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            const arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
            let nTemp = 0;
            for (let i = 0; i < 17; i++) {
                nTemp += Number(num.substr(i, 1)) * arrInt[i];
            }
            const valnum = arrCh[nTemp % 11];
            if (valnum !== num.substr(17, 1)) {
                // throw '身份证格式错误！';
                return false;
            }
            return true;
        }
    }
};

/**
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/validate.html#validatephone
 */
export const validatePhone = (phone: string) => /^(0\d{2,3}-?\d{7,8}|0\d{9,11}|1[3-9]\d{9})$/.test(phone);

/**
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/validate.html#validatename
 */
export const validateName = (name: string) => /^[\u3400-\u4DB5\u4E00-\u9FCB]{2,10}([\u00B7\u25CF][\u3400-\u4DB5\u4E00-\u9FCB]{2,10})*$/gi.test(name);
