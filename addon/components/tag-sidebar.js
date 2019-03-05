import Component from '@ember/component';
import layout from '../templates/components/tag-sidebar';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  router: service(),

  // not working
  showSidebar: computed('router.currentRoute', function() {
    if (this.router.currentRoute === 'author') {
      return false;
    } 
    return true;
  }),

  layout
});
