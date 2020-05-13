import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import percySnapshot from '@percy/ember';
import { ALL_TAGS, EMBER_TIMES_TAG, RECENT_POSTS_TAG, SUBJECT_TAG, RELEASES_TAG, YEAR_2018_TAG, YEAR_2019_TAG, VERSION_2X_TAG, VERSION_3X_TAG } from '../data/tags';

module('Integration | Component | tag-panel', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.setupRouter();
  });

  test('it renders in Percy', async function(assert) {
    this.set('tags', ALL_TAGS);

    await render(hbs`<TagPanel @tags={{tags}} />`);

    await percySnapshot('Component - tag-panel');
    assert.expect(0);
  });

  module('Recent Posts', function() {
    test('it does not render section if there is no "recent-posts" tag', async function(assert) {
      this.set('tags', [SUBJECT_TAG]);
  
      await render(hbs`<TagPanel @tags={{tags}} />`);
  
      assert.dom('[data-test-recent-posts]').doesNotExist();
    });

    test('it renders section if there is "recent-posts" tag', async function(assert) {

      this.set('tags', [RECENT_POSTS_TAG]);
  
      await render(hbs`<TagPanel @tags={{tags}} />`);
      const section = this.element.querySelector('[data-test-recent-posts]');
  
      assert.dom(section).exists();
      assert.dom('[data-test-tag-post-list]', section).containsText(RECENT_POSTS_TAG.name);
    });
  });

  module('Releases', function() {
    test('it does not render section if there is no "releases" tag', async function(assert) {
      this.set('tags', [SUBJECT_TAG]);
  
      await render(hbs`<TagPanel @tags={{tags}} />`);
  
      assert.dom('[data-test-releases]').doesNotExist();
    });

    test('it renders section if there is "releases" tag', async function(assert) {
      this.set('tags', [RELEASES_TAG]);
  
      await render(hbs`<TagPanel @tags={{tags}} />`);
      const section = this.element.querySelector('[data-test-releases]');
  
      assert.dom(section).exists();
      assert.dom('[data-test-tag-post-list]', section).containsText(RELEASES_TAG.name);
    });
  });

  module('The Ember Times', function() {
    test('it does not render section if there is no "newsletter" tag', async function(assert) {
      this.set('tags', [SUBJECT_TAG]);
  
      await render(hbs`<TagPanel @tags={{tags}} />`);
  
      assert.dom('[data-test-ember-times]').doesNotExist();
    });

    test('it renders section if there is "newsletter" tag', async function(assert) {
      this.set('tags', [EMBER_TIMES_TAG]);
  
      await render(hbs`<TagPanel @tags={{tags}} />`);
      const section = this.element.querySelector('[data-test-ember-times]');
  
      assert.dom(section).exists();
      assert.dom('[data-test-tag-post-list]', section).containsText(EMBER_TIMES_TAG.name);
    });
  });

  module('By Years', function() {
    test('it does not render section if there are no year tags', async function(assert) {
      this.set('tags', [SUBJECT_TAG]);
  
      await render(hbs`<TagPanel @tags={{tags}} />`);
  
      assert.dom('[data-test-by-year]').doesNotExist();
    });

    test('it renders section if there are year tags', async function(assert) {
      this.set('tags', [YEAR_2019_TAG]);
  
      await render(hbs`<TagPanel @tags={{tags}} />`);
      const section = this.element.querySelector('[data-test-by-year]');

      assert.dom(section).exists();
      assert.dom('[data-test-section-title]', section).hasText('By Year');
      assert.dom('[data-test-tag-link]', section).hasText(YEAR_2019_TAG.name);
      assert.dom('[data-test-tag-link]', section).hasAttribute('href', `/tag/${YEAR_2019_TAG.id}`);
    });

    test('it renders tags in descending order', async function(assert) {
      this.set('tags', [YEAR_2018_TAG, YEAR_2019_TAG]);
  
      await render(hbs`<TagPanel @tags={{tags}} />`);
      const section = this.element.querySelector('[data-test-by-year]');
      const tagLinks = section.querySelectorAll('[data-test-tag-link]');

      assert.dom(tagLinks.item(0)).hasText(YEAR_2019_TAG.name);
      assert.dom(tagLinks.item(1)).hasText(YEAR_2018_TAG.name);
    });

    test('it uses ARIA attributes to connect list to header', async function(assert) {
      this.set('tags', [YEAR_2019_TAG]);
  
      await render(hbs`<TagPanel @tags={{tags}} />`);
      const section = this.element.querySelector('[data-test-by-year]');
  
      assert.dom('[data-test-section-title]', section).hasAttribute('id', 'by-year-tag-section-title');
      assert.dom('[data-test-tag-list]', section).hasAttribute('aria-labelledby', 'by-year-tag-section-title');
    });
  });

  module('By Major Version', function() {
    test('it does not render section if there are no version tags', async function(assert) {
      this.set('tags', [SUBJECT_TAG]);
  
      await render(hbs`<TagPanel @tags={{tags}} />`);
  
      assert.dom('[data-test-by-version]').doesNotExist();
    });

    test('it renders section if there are version tags', async function(assert) {
      this.set('tags', [VERSION_3X_TAG]);
  
      await render(hbs`<TagPanel @tags={{tags}} />`);
      const section = this.element.querySelector('[data-test-by-version]');

      assert.dom(section).exists();
      assert.dom('[data-test-section-title]', section).hasText('By Major Version');
      assert.dom('[data-test-tag-link]', section).hasText(VERSION_3X_TAG.name);
      assert.dom('[data-test-tag-link]', section).hasAttribute('href', `/tag/${VERSION_3X_TAG.id}`);
    });

    test('it renders tags in descending order', async function(assert) {
      this.set('tags', [VERSION_2X_TAG, VERSION_3X_TAG]);
  
      await render(hbs`<TagPanel @tags={{tags}} />`);
      const section = this.element.querySelector('[data-test-by-version]');
      const tagLinks = section.querySelectorAll('[data-test-tag-link]');

      assert.dom(tagLinks.item(0)).hasText(VERSION_3X_TAG.name);
      assert.dom(tagLinks.item(1)).hasText(VERSION_2X_TAG.name);
    });

    test('it uses ARIA attributes to connect list to header', async function(assert) {
      this.set('tags', [VERSION_3X_TAG]);
  
      await render(hbs`<TagPanel @tags={{tags}} />`);
      const section = this.element.querySelector('[data-test-by-version]');
  
      assert.dom('[data-test-section-title]', section).hasAttribute('id', 'by-version-tag-section-title');
      assert.dom('[data-test-tag-list]', section).hasAttribute('aria-labelledby', 'by-version-tag-section-title');
    });
  });

  module('By Subject', function() {
    test('it does not render section if there are no subject tags', async function(assert) {
      this.set('tags', [RELEASES_TAG]);
  
      await render(hbs`<TagPanel @tags={{tags}} />`);
  
      assert.dom('[data-test-by-subject]').doesNotExist();
    });

    test('it renders section if there are subject tags', async function(assert) {
      this.set('tags', [SUBJECT_TAG]);
  
      await render(hbs`<TagPanel @tags={{tags}} />`);
      const section = this.element.querySelector('[data-test-by-subject]');

      assert.dom(section).exists();
      assert.dom('[data-test-section-title]', section).hasText('By Subject');
      assert.dom('[data-test-tag-link]', section).hasText(SUBJECT_TAG.name);
      assert.dom('[data-test-tag-link]', section).hasAttribute('href', `/tag/${SUBJECT_TAG.id}`);
    });

    test('it uses ARIA attributes to connect list to header', async function(assert) {
      this.set('tags', [SUBJECT_TAG]);
  
      await render(hbs`<TagPanel @tags={{tags}} />`);
      const section = this.element.querySelector('[data-test-by-subject]');
  
      assert.dom('[data-test-section-title]', section).hasAttribute('id', 'by-subject-tag-section-title');
      assert.dom('[data-test-tag-list]', section).hasAttribute('aria-labelledby', 'by-subject-tag-section-title');
    });
  });
});
