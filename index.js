'use strict';
var Funnel = require('broccoli-funnel');
const { join } = require('path');

module.exports = {
  name: 'empress-blog-ember-template',

  treeForPublic: function() {
    return new Funnel(join(this.root, 'public'));
  },
};
