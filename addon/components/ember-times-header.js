import Component from '@glimmer/component';

export default class TimesHeaderComponent extends Component {
  get isNewsletter() {
    return this.args.tags && this.args.tags.includes('Newsletter');
  }
}
