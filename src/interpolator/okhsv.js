require('../io/okhsv');
const interpolate_hsx = require('./_hsx');

const okhsv = (col1, col2, f) => {
    return interpolate_hsx(col1, col2, f, 'okhsv');
};

// register interpolator
require('./index').okhsv = okhsv;

module.exports = okhsv;
