import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class TagSidebarComponent extends Component {
  @service router;

  get showSidebar() {
    if (this.router.currentRouteName === 'author') {

      return false;
    }
    return true;
  }
}
