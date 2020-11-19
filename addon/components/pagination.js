import Component from '@glimmer/component';

const matcher = /\/content\/content-(\d+).json/

export default class PaginationComponent extends Component {
  get previousId() {
    let matched = this.args.model.links.prev?.match(matcher);

    if (matched) {
      return matched[1];
    }

    return null;
  }

  get nextId() {
    let matched = this.args.model.links.next?.match(matcher);

    if (matched) {
      return matched[1];
    }

    return null;
  }
}
