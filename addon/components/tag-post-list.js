import Component from '@glimmer/component';

const topPostCount = 3;

/**
 * Displays the latest posts for the given tag.
 *
 * @example
 *   <TagPostList @tag={{tag}} />
 */
export default class TagPostList extends Component {
  get topPosts() {
    return this.args.tag.posts.slice(0, topPostCount);
  }

  get titleId() {
    return `${this.args.tag.id}-tag`;
  }
}
