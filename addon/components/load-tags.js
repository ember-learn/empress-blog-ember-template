import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class LoadTagsComponent extends Component {
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
    return this.args.tag.hasMany('posts').ids().length;
  }

  constructor() {
    super(...arguments);

    this.loadInitial(this.args.tag);
  }

  @action
  async loadInitial() {
    this.posts = [];
    this.page = 1;
    this.posts = await this.args.tag.posts;
  }

  @action
  loadMore() {
    this.page++;
  }
}
