import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import percySnapshot from '@percy/ember';

const POST = { id: 'why-ember', title: 'Why Ember' };

const POSTS = [
  POST,
  { id: 'managing-users', title: 'Managing Ghost users' },
  { id: 'setting-up-theme', title: 'Setting up your own Ghost theme' },
  { id: 'advanced-markdown', title: 'Advanced Markdown tips' }
];

const TAG = {
  id: 'getting-started',
  name: 'Getting Started',
  posts: POSTS
};

module('Integration | Component | tag-post-list', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.setupRouter();
  });

  test('it renders a tag name', async function(assert) {
    this.set('tag', TAG);

    await render(hbs`<TagPostList @tag={{tag}} />`);

    await percySnapshot('Component - tag-post-list');

    assert.dom('[data-test-tag-name]').hasText(TAG.name);
  });

  test('it renders top 3 posts', async function(assert) {
    const tag = { ...TAG, posts: POSTS };
    this.set('tag', tag);

    await render(hbs`<TagPostList @tag={{tag}} />`);

    assert.dom('[data-test-post-link]').exists({ count: 3});
  });

  test('it renders post links', async function(assert) {
    const tag = { ...TAG, posts: [POST] };
    this.set('tag', tag);

    await render(hbs`<TagPostList @tag={{tag}} />`);

    assert.dom('[data-test-post-link]').exists({ count: 1});
    assert.dom('[data-test-post-link]').hasTagName('a');
    assert.dom('[data-test-post-link]').hasAttribute('href', `/${POST.id}`);
    assert.dom('[data-test-post-link]').containsText(POST.title);
  });

  test('it renders a link for more posts', async function(assert) {
    this.set('tag', TAG);

    await render(hbs`<TagPostList @tag={{tag}} />`);

    assert.dom('[data-test-more-posts]').hasTagName('a');
    assert.dom('[data-test-more-posts]').hasAttribute('href', `/tag/${TAG.id}`);
    assert.dom('[data-test-more-posts]').containsText(`More ${TAG.name}...`);
  });

  test('it uses ARIA attributes to connect a post list to a header', async function(assert) {
    this.set('tag', TAG);

    await render(hbs`<TagPostList @tag={{tag}} />`);

    assert.dom('[data-test-tag-name]').hasAttribute('id', `${TAG.id}-tag`);
    assert.dom('[data-test-post-list]').hasAttribute('aria-labelledby', `${TAG.id}-tag`);
  });
});
