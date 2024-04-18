require('../io/okhsl');
const interpolate_hsx = require('./_hsx');

const okhsl = (col1, col2, f) => {
    return interpolate_hsx(col1, col2, f, 'okhsl');
};

// register interpolator
require('./index').okhsl = okhsl;

module.exports = okhsl;
