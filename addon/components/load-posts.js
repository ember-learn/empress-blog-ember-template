import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default class LoadPostsComponent extends Component {
  @service store;

  @tracked posts = [];
  @tracked page = 1;

  get postAmount () {
    return this.page * 10;
  }

  get visiblePosts () {
    return this.posts.slice(0, this.postAmount);
  }

  get totalPosts () {
    return this.args.model.hasMany('posts').ids().length;
  }

  constructor() {
    super(...arguments);

    this.loadInitial(this.args.model);
  }

  @action
  async loadInitial(model) {
    this.loadInitialTask.perform(model);
  }

  @(task(function*(model) {
    this.page = 1;
    let posts = yield model.posts;
    this.posts = posts ? posts.sortBy('date').reverse() : [];
  }).restartable())
  loadInitialTask;

  @action
  loadMore() {
    this.page++;
  }
}
