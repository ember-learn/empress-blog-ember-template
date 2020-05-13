export const POST = {
  id: 'why-ember',
  title: 'Why Ember'
};

export const ANOTHER_POST = {
  id: 'managing-users',
  title: 'Managing Ghost users'
};

export const POSTS = [
  POST,
  ANOTHER_POST
];

export const MORE_THAN_3_POSTS = [
  ...POSTS,
  { id: 'setting-up-theme', title: 'Setting up your own Ghost theme' },
  { id: 'advanced-markdown', title: 'Advanced Markdown tips' }
];
