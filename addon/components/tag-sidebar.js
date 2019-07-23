import Component from '@ember/component';
import layout from '../templates/components/tag-sidebar';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { filter } from '@ember/object/computed';

export default Component.extend({
  router: service(),

  fiteredTags: filter('tags.[]', ['yearTags'], function(tag) {
    let individualIgnoredTags = [
      'releases',
      'new',
      'newsletter',
    ];

    let allIgnoredTags = [
      ...individualIgnoredTags,
      ...this.yearTags.map(tag => tag.id),
      ...this.versionTags.map(tag => tag.id),
    ]

    return !allIgnoredTags.includes(tag.id);
  }),

  yearTags: filter('tags.[]', function(tag) {
    console.log(tag.id, tag.id.match(/^20\d\d$/))
    return tag.id.match(/^20\d\d$/);
  }),

  versionTags: filter('tags.[]', function(chore, index, array) {
    
  }),

  showSidebar: computed('router.currentRouteName', function() {
    if (this.router.currentRouteName === 'author') {

      return false;
    } 
    return true;
  }),

  layout
});
