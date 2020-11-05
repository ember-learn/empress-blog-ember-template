import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';
import withTestWaiter from 'ember-concurrency-test-waiter/with-test-waiter';

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

    this.loadTopPostsTask.perform(this.args.tag);
  }

  @(withTestWaiter(task(function*(tag){
    const ids = (yield tag._postIds).slice(0, topPostCount);
    this.topPosts = yield Promise.all(ids.map(id => this.store.findRecord('content', id)));
  }).restartable()))
  loadTopPostsTask;

  get titleId() {
    return `${this.args.tag.id}-tag`;
  }
}
