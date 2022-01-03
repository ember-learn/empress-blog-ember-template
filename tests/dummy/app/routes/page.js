/* eslint-disable prettier/prettier */
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

// this will be available in the ember-blog as an override too
export default class PageRoute extends Route {
  templateName = 'index';

  @service store;

  model(params) {
    return this.store.query('content', {page: `/content/content-${params.id}.json`});
  }
}
