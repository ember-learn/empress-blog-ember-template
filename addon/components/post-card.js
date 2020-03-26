import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class PostCardComponent extends Component {
  @service blog;
  @service router;
  @service url;
}
