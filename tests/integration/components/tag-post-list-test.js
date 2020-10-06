import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, waitFor } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import percySnapshot from '@percy/ember';

let store;

module('Integration | Component | tag-post-list', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.setupRouter();
    store = this.owner.lookup('service:store');
  });

  test('it renders in Percy', async function(assert) {
    let tag = await store.findRecord('tag', 'getting-started');
    this.set('tag', tag);

    await render(hbs`<TagPostList @tag={{this.tag}} />`);

    await percySnapshot('Component - tag-post-list');
    assert.expect(0);
  });

  test('it renders a tag name', async function(assert) {
    let tag = await store.findRecord('tag', 'getting-started');
    this.set('tag', tag);

    await render(hbs`<TagPostList @tag={{tag}} />`);

    assert.dom('[data-test-tag-name]').hasText(tag.name);
  });

  test('it renders top 3 posts', async function(assert) {
    let tag = await store.findRecord('tag', 'getting-started');
    this.set('tag', tag);

    await render(hbs`<TagPostList @tag={{tag}} />`);

    await waitFor('[data-test-post-link]');

    assert.dom('[data-test-post-link]').exists({ count: 3});
  });

  test('it renders post links', async function(assert) {
    let tag = await store.findRecord('tag', 'getting-started');
    this.set('tag', tag);

    await render(hbs`<TagPostList @tag={{tag}} />`);

    await waitFor('[data-test-post-link]');

    assert.dom('[data-test-post-link]').hasTagName('a');
    assert.dom('[data-test-post-link]').hasAttribute('href', `/welcome`);
    assert.dom('[data-test-post-link]').containsText('Welcome to empress-blog'); // NOTE: this string has a non-breaking space
    assert.dom('[data-test-post-list]').hasAttribute('aria-labelledby', `getting-started-tag`);
    assert.dom('[data-test-more-posts]').containsText(`More Getting Started...`);
  });
});
