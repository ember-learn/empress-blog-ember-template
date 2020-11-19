import Route from '@ember/routing/route';

// this will be available in the ember-blog as an override too
export default class PageRoute extends Route {
  templateName = 'index';

  model(params) {
    return this.store.query('content', {page: `/content/content-${params.id}.json`});
  }
}
