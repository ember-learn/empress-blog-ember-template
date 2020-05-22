import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

import DS from 'ember-data';

const topPostCount = 3;

/**
 * Displays the latest posts for the given tag.
 *
 * @example
 *   <TagPostList @tag={{tag}} />
 */
export default class TagPostList extends Component {
  @service store;

  // this can't be a getter because returning a `DS.PromiseArray` from a getter
  // causes an infinte loop
  @tracked topPosts;

  constructor() {
    super(...arguments);

    let ids = this.args.tag.hasMany('posts').ids().slice(0, topPostCount);

    let promise = Promise.all(ids.map(id => this.store.findRecord('content', id)));

    this.topPosts = DS.PromiseArray.create({
      promise,
    });
  }

  get titleId() {
    return `${this.args.tag.id}-tag`;
  }
}
