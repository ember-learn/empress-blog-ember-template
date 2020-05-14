import {POSTS, POST, ANOTHER_POST, MORE_THAN_3_POSTS} from './posts';

export const RECENT_POSTS_TAG = {
  id: 'new',
  name: 'Recent Posts',
  posts: POSTS
};

export const RELEASES_TAG = {
  id: 'releases',
  name: 'Releases',
  posts: [POST]
};

export const EMBER_TIMES_TAG = {
  id: 'newsletter',
  name: 'The Ember Times',
  posts: [ANOTHER_POST]
};

export const VERSION_2X_TAG = {
  id: 'version-2.x',
  name: '2.x',
  posts: MORE_THAN_3_POSTS
};

export const VERSION_3X_TAG = {
  id: 'version-3.x',
  name: '3.x',
  posts: [POST]
};

export const YEAR_2018_TAG = {
  id: '2018',
  name: '2018',
  posts: [ANOTHER_POST]
};

export const YEAR_2019_TAG = {
  id: '2019',
  name: '2019',
  posts: POSTS
};

export const SUBJECT_TAG = {
  id: 'getting-started',
  name: 'Getting Started',
  posts: MORE_THAN_3_POSTS
};

export const ALL_TAGS = [
  RECENT_POSTS_TAG,
  RELEASES_TAG,
  EMBER_TIMES_TAG,
  VERSION_2X_TAG,
  VERSION_3X_TAG,
  YEAR_2018_TAG,
  YEAR_2019_TAG,
  SUBJECT_TAG,
];

export const TAG = SUBJECT_TAG;
