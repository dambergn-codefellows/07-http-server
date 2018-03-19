'use strict';

const storage = {};

module.exports = exports = {};

exports.createItem = function(schemaName, item) {
    if (!schemaName) return Promise.reject(new Error('expected schema name'));
    if (!item) return Promise.reject(new Error('expected item'));
    if (!storage[schemaName]) storage[schemaName] = {};

    storage[schemaName][item.id] = item;
}