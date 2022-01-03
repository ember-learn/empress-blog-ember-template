/* eslint-disable prettier/prettier */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import percySnapshot from '@percy/ember';

let store;

module('Integration | Component | tag-panel', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.setupRouter();
    store = this.owner.lookup('service:store');
  });

  test('it renders in Percy', async function(assert) {
    let tags = await store.findAll('tag');
    this.set('tags', tags);

    await render(hbs`<TagPanel @tags={{this.tags}} />`);

    await percySnapshot('Component - tag-panel');
    assert.expect(0);
  });

  module('Recent Posts', function() {
    test('it does not render section if there is no "recent-posts" tag', async function(assert) {
      let subjectTag = await store.findRecord('tag', 'getting-started');
      this.set('tags', [subjectTag]);

      await render(hbs`<TagPanel @tags={{this.tags}} />`);

      assert.dom('[data-test-recent-posts]').doesNotExist();
    });

    test('it renders section if there is "recent-posts" tag', async function(assert) {
      let recentPostsTag = await store.findRecord('tag', 'new');
      this.set('tags', [recentPostsTag]);

      await render(hbs`<TagPanel @tags={{this.tags}} />`);
      const section = this.element.querySelector('[data-test-recent-posts]');

      assert.dom(section).exists();
      assert.dom('[data-test-tag-post-list]', section).containsText(recentPostsTag.name);
    });
  });

  module('Releases', function() {
    test('it does not render section if there is no "releases" tag', async function(assert) {
      let subjectTag = await store.findRecord('tag', 'getting-started');
      this.set('tags', [subjectTag]);

      await render(hbs`<TagPanel @tags={{this.tags}} />`);

      assert.dom('[data-test-releases]').doesNotExist();
    });

    test('it renders section if there is "releases" tag', async function(assert) {
      let releasesTag = await store.findRecord('tag', 'releases');
      this.set('tags', [releasesTag]);

      await render(hbs`<TagPanel @tags={{this.tags}} />`);
      const section = this.element.querySelector('[data-test-releases]');

      assert.dom(section).exists();
      assert.dom('[data-test-tag-post-list]', section).containsText(releasesTag.name);
    });
  });

  module('The Ember Times', function() {
    test('it does not render section if there is no "newsletter" tag', async function(assert) {
      let subjectTag = await store.findRecord('tag', 'getting-started');
      this.set('tags', [subjectTag]);

      await render(hbs`<TagPanel @tags={{this.tags}} />`);

      assert.dom('[data-test-ember-times]').doesNotExist();
    });

    test('it renders section if there is "newsletter" tag', async function(assert) {
      let emberTimesTag = await store.findRecord('tag', 'newsletter');
      this.set('tags', [emberTimesTag]);

      await render(hbs`<TagPanel @tags={{this.tags}} />`);
      const section = this.element.querySelector('[data-test-ember-times]');

      assert.dom(section).exists();
      assert.dom('[data-test-tag-post-list]', section).containsText(emberTimesTag.name);
    });
  });

  module('By Years', function() {
    test('it does not render section if there are no year tags', async function(assert) {
      let subjectTag = await store.findRecord('tag', 'getting-started');
      this.set('tags', [subjectTag]);

      await render(hbs`<TagPanel @tags={{this.tags}} />`);

      assert.dom('[data-test-by-year]').doesNotExist();
    });

    test('it renders section if there are year tags', async function(assert) {
      let year2019Tag = await store.findRecord('tag', '2019');
      this.set('tags', [year2019Tag]);

      await render(hbs`<TagPanel @tags={{this.tags}} />`);
      const section = this.element.querySelector('[data-test-by-year]');

      assert.dom(section).exists();
      assert.dom('[data-test-section-title]', section).hasText('By Year');
      assert.dom('[data-test-tag-link]', section).hasText(year2019Tag.name);
      assert.dom('[data-test-tag-link]', section).hasAttribute('href', `/tag/${year2019Tag.id}`);
    });

    test('it renders tags in descending order', async function(assert) {
      let year2018Tag = await store.findRecord('tag', '2018');
      let year2019Tag = await store.findRecord('tag', '2019');
      this.set('tags', [year2019Tag, year2018Tag]);

      await render(hbs`<TagPanel @tags={{this.tags}} />`);
      const section = this.element.querySelector('[data-test-by-year]');
      const tagLinks = section.querySelectorAll('[data-test-tag-link]');

      assert.dom(tagLinks.item(0)).hasText(year2019Tag.name);
      assert.dom(tagLinks.item(1)).hasText(year2018Tag.name);
    });

    test('it uses ARIA attributes to connect list to header', async function(assert) {
      let year2019Tag = await store.findRecord('tag', '2019');
      this.set('tags', [year2019Tag]);

      await render(hbs`<TagPanel @tags={{this.tags}} />`);
      const section = this.element.querySelector('[data-test-by-year]');

      assert.dom('[data-test-section-title]', section).hasAttribute('id', 'by-year-tag-section-title');
      assert.dom('[data-test-tag-list]', section).hasAttribute('aria-labelledby', 'by-year-tag-section-title');
    });
  });

  module('By Major Version', function() {
    test('it does not render section if there are no version tags', async function(assert) {
      let subjectTag = await store.findRecord('tag', 'getting-started');
      this.set('tags', [subjectTag]);

      await render(hbs`<TagPanel @tags={{this.tags}} />`);

      assert.dom('[data-test-by-version]').doesNotExist();
    });

    test('it renders section if there are version tags', async function(assert) {
      let version3Tag = await store.findRecord('tag', 'version-3-x');
      this.set('tags', [version3Tag]);

      await render(hbs`<TagPanel @tags={{this.tags}} />`);
      const section = this.element.querySelector('[data-test-by-version]');

      assert.dom(section).exists();
      assert.dom('[data-test-section-title]', section).hasText('By Major Version');
      assert.dom('[data-test-tag-link]', section).hasText(version3Tag.name);
      assert.dom('[data-test-tag-link]', section).hasAttribute('href', `/tag/${version3Tag.id}`);
    });

    test('it renders tags in descending order', async function(assert) {
      let version2Tag = await store.findRecord('tag', 'version-2-x');
      let version3Tag = await store.findRecord('tag', 'version-3-x');
      this.set('tags', [version2Tag, version3Tag]);

      await render(hbs`<TagPanel @tags={{this.tags}} />`);
      const section = this.element.querySelector('[data-test-by-version]');
      const tagLinks = section.querySelectorAll('[data-test-tag-link]');

      assert.dom(tagLinks.item(0)).hasText(version3Tag.name);
      assert.dom(tagLinks.item(1)).hasText(version2Tag.name);
    });

    test('it uses ARIA attributes to connect list to header', async function(assert) {
      let version3Tag = await store.findRecord('tag', 'version-3-x');
      this.set('tags', [version3Tag]);

      await render(hbs`<TagPanel @tags={{this.tags}} />`);
      const section = this.element.querySelector('[data-test-by-version]');

      assert.dom('[data-test-section-title]', section).hasAttribute('id', 'by-version-tag-section-title');
      assert.dom('[data-test-tag-list]', section).hasAttribute('aria-labelledby', 'by-version-tag-section-title');
    });
  });

  module('By Subject', function() {
    test('it does not render section if there are no subject tags', async function(assert) {
      let releasesTag = await store.findRecord('tag', 'releases');
      this.set('tags', [releasesTag]);

      await render(hbs`<TagPanel @tags={{this.tags}} />`);

      assert.dom('[data-test-by-subject]').doesNotExist();
    });

    test('it renders section if there are subject tags', async function(assert) {
      let subjectTag = await store.findRecord('tag', 'getting-started');
      this.set('tags', [subjectTag]);

      await render(hbs`<TagPanel @tags={{this.tags}} />`);
      const section = this.element.querySelector('[data-test-by-subject]');

      assert.dom(section).exists();
      assert.dom('[data-test-section-title]', section).hasText('By Subject');
      assert.dom('[data-test-tag-link]', section).hasText(subjectTag.name);
      assert.dom('[data-test-tag-link]', section).hasAttribute('href', `/tag/${subjectTag.id}`);
    });

    test('it uses ARIA attributes to connect list to header', async function(assert) {
      let subjectTag = await store.findRecord('tag', 'getting-started');
      this.set('tags', [subjectTag]);

      await render(hbs`<TagPanel @tags={{this.tags}} />`);
      const section = this.element.querySelector('[data-test-by-subject]');

      assert.dom('[data-test-section-title]', section).hasAttribute('id', 'by-subject-tag-section-title');
      assert.dom('[data-test-tag-list]', section).hasAttribute('aria-labelledby', 'by-subject-tag-section-title');
    });
  });
});
