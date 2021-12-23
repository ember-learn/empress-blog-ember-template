/* eslint-disable prettier/prettier */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | date-format', function(hooks) {
  setupRenderingTest(hooks);

  test('it returns a date string', async function(assert) {

    await render(hbs`{{date-format "2018-07-30T00:00:00.000Z"}}`);
    console.log(this.element.textContent)
    assert.ok(this.element.textContent.includes('Jul 30, 2018'));
  });
});
