import Component from '@glimmer/component';

const recentPostsTagId = 'new';
const releasesTagId = 'releases';
const emberTimesTagId = 'newsletter';
const versionTagIds = ['version-3-x', 'version-2-x', 'version-1-x'];
const yearTagIds = ['2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012'];

/**
 * Displays tags orginized in groups.
 *
 * @example
 *   <TagPanel @tags={{tags}} />
 */
export default class TagPanel extends Component {
  get recentPostsTag() {
    return this.args.tags.find(tag => tag.id === recentPostsTagId);
  }

  get releasesTag() {
    return this.args.tags.find(tag => tag.id === releasesTagId);
  }

  get emberTimesTag() {
    return this.args.tags.find(tag => tag.id === emberTimesTagId);
  }

  get versionTags() {
    return versionTagIds
      .map(id => this.args.tags.find(tag => tag.id === id))
      .filter(Boolean);
  }

  get yearTags() {
    return yearTagIds
      .map(id => this.args.tags.find(tag => tag.id === id))
      .filter(Boolean);
  }

  get subjectTags() {
    const usedTagIds = new Set([
      recentPostsTagId,
      releasesTagId,
      emberTimesTagId,
      ...versionTagIds,
      ...yearTagIds
    ]);

    return this.args.tags.filter(tag => !usedTagIds.has(tag.id));
  }
}
