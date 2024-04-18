const { unpack, type } = require('../../utils');
const chroma = require('../../chroma');
const Color = require('../../Color');
const input = require('../input');
const { srgb_to_okhsv, okhsv_to_srgb } = require('../../utils/okhsl-okhsv');

Color.prototype.okhsv = function () {
    return srgb_to_okhsv(this._rgb);
};

chroma.okhsv = (...args) => new Color(...args, 'okhsv');

input.format.okhsv = okhsv_to_srgb;

input.autodetect.push({
    p: 3,
    test: (...args) => {
        args = unpack(args, 'okhsv');
        if (type(args) === 'array' && args.length === 3) {
            return 'okhsv';
        }
    }
});
