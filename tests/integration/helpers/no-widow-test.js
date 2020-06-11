import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | no-widow', function(hooks) {
  setupRenderingTest(hooks);

  test('it replaces the last occurrence of a space with a non-breaking space', async function(assert) {
    this.set('inputValue', 'My title');

    await render(hbs`{{no-widow inputValue}}`);

    // NOTE: there is a non-breaking space in the below string
    assert.dom(this.element).hasText('My title');

    this.set('inputValue', 'My much longer title');

    // NOTE: there is a non-breaking space in the below string
    assert.dom(this.element).hasText('My much longer title');

    this.set('inputValue', 'Title');
    assert.dom(this.element).hasText('Title');
  });
});
