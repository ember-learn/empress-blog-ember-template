/* eslint-disable prettier/prettier, qunit/no-assert-equal */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | skeleton-loader', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<SkeletonLoader />`);

    assert.equal(this.element.textContent.trim(), '');

    await render(hbs`
      <SkeletonLoader>
        template block text
      </SkeletonLoader>
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
