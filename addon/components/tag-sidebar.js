import Component from '@ember/component';
import layout from '../templates/components/tag-sidebar';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  router: service(),

  showSidebar: computed('router.currentRouteName', function() {
    console.log(this.router.currentRouteName);
    if (this.router.currentRouteName === 'author') {

      return false;
    } 
    return true;
  }),

  layout
});
