const { unpack, type } = require('../../utils');
const chroma = require('../../chroma');
const Color = require('../../Color');
const input = require('../input');
const { srgb_to_okhsl, okhsl_to_srgb } = require('../../utils/okhsl-okhsv');

Color.prototype.okhsl = function () {
    const coordinates = srgb_to_okhsl(...this._rgb);
    coordinates[0] = coordinates[0] * 180;
    coordinates[1] = Math.min(coordinates[1], 1);
    coordinates[2] = Math.min(coordinates[2], 1);
    return coordinates;
};

chroma.okhsl = (...args) => new Color(...args, 'okhsl');

input.format.okhsl = args => {
    return okhsl_to_srgb(args[0] / 180, args[1], args[2]);
};

input.autodetect.push({
    p: 3,
    test: (...args) => {
        args = unpack(args, 'okhsl');
        if (type(args) === 'array' && args.length === 3) {
            return 'okhsl';
        }
    }
});
