const { unpack, type } = require('../../utils');
const chroma = require('../../chroma');
const Color = require('../../Color');
const input = require('../input');
const { srgb_to_okhsl, okhsl_to_srgb } = require('../../utils/okhsl-okhsv');

Color.prototype.okhsl = function () {
    return srgb_to_okhsl(this._rgb);
};

chroma.okhsl = (...args) => new Color(...args, 'okhsl');

input.format.okhsl = okhsl_to_srgb;

input.autodetect.push({
    p: 3,
    test: (...args) => {
        args = unpack(args, 'okhsl');
        if (type(args) === 'array' && args.length === 3) {
            return 'okhsl';
        }
    }
});
