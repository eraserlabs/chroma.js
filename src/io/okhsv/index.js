const { unpack, type } = require('../../utils');
const chroma = require('../../chroma');
const Color = require('../../Color');
const input = require('../input');
const { srgb_to_okhsv, okhsv_to_srgb } = require('../../utils/okhsl-okhsv');

Color.prototype.okhsv = function () {
    const coordinates = srgb_to_okhsv(...this._rgb);
    coordinates[0] = coordinates[0] * 180;
    coordinates[1] = Math.min(coordinates[1], 1);
    coordinates[2] = Math.min(coordinates[2], 1);
    return coordinates;
};

chroma.okhsv = (...args) => new Color(...args, 'okhsv');

input.format.okhsv = args => {
    return okhsv_to_srgb(args[0] / 180, args[1], args[2]);
};

input.autodetect.push({
    p: 3,
    test: (...args) => {
        args = unpack(args, 'okhsv');
        if (type(args) === 'array' && args.length === 3) {
            return 'okhsv';
        }
    }
});
