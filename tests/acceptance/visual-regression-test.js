/* eslint-disable prettier/prettier */
import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import percySnapshot from '@percy/ember';

module('Acceptance | visual regression', function(hooks) {
  setupApplicationTest(hooks);

  test(`visiting visual regressions with Percy`, async function(assert) {
    assert.expect(0);

    await visit('/');
    await percySnapshot('Index');

    await visit('/2018-11-02-the-ember-times-issue-71');
    await percySnapshot('Post - Ember Times');

    await visit('/2018-10-15-ember-3-5-released');
    await percySnapshot('Post - Release');

    await visit('/ember-3-14-released');
    await percySnapshot('Post - 3.14 Release');

    await visit('/author/chris');
    await percySnapshot('Author - Chris');

    await visit('/tag/new');
    await percySnapshot('Tag - New');

    await visit('/tag/newsletter');
    await percySnapshot('Tag - Ember Times');
  });
});
