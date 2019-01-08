import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/ember-times-header';

export default Component.extend({
  layout,

  isNewsletter: computed('tags.[]', function() {
    return this.tags && this.tags.includes('Newsletter');
  })
});
