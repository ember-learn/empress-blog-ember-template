1.1.2 / 2021-03-12
==================

  * Add years to yearTagIds #108 from @amyrlam

1.1.1 / 2021-02-04
==================

  * use new post url for discourse comments since empress-blog release #103 from @mansona
  * force a refresh of the comment scripts when the passed in post changes #102 from @nickschot
  * update empress-blog to v3 (only for local development) #100 from @nickschot

1.1.0 / 2020-12-13
==================

  * replace last moment usages & remove moment dependency #98 from @nickschot

1.0.2 / 2020-12-11
==================

  * Dates stay in their original timezone #97 from @jenweber

1.0.1 / 2020-11-26
==================

  * fix overview & post view font weight & spacing discrepancy #94 from @nickschot
  * move to GitHub actions #95 from @mansona

1.0.0 / 2020-11-19
==================

This is now a 1.0 release because it is ready to be used in production 🎉

  * Better pagination #93 from @mansona
  * implement author page redesign #92 from @nickschot and @claeusdev
  * Add Ember times logo to post and tag page #90 from @mansona
  * use stable postIds attribute instead of the unstable relationship reference #89 from @nickschot
  * implement skeleton loader component #91 from @nickschot
  * fix meta implementation #88 from @mansona

0.7.3 / 2020-10-29
==================

  * Update ember styleguide #82 from @mansona
  * implement global loading/progress bar #81 from @nickschot

0.7.1 / 2020-10-08
==================

  * Fix production build #80 from @mansona

0.7.0 / 2020-10-08
==================

  * Post Page implementation Emberify + Redesign #39 from @ankushdharkar and @jaredgalanis

0.6.1 / 2020-08-24
==================

  * update ember-showdown-prism to 2.2.0 (enables line-numbers) #78 from @nickschot

0.6.0 / 2020-08-19
==================

  * upgrade to ember-cli 3.20 and other dependencies #75 from @nickschot
  * Fix dev dependencies and upgrade ember-showdown-prism #77 from @nickschot
  * Replace usage of private PromiseArray with ember-concurrency task #76 from @nickschot
  * hide the loading button for a single render so Chrome does not keep the scroll position at the loading button #73 from @nickschot
  * close sidebar after a route transition #65 from @nickschot
  * fix issue with ember-get-config and comments #64 from @mansona

0.5.0 / 2020-07-10
==================

  * Implement both old & new comment system #63 from @nickschot
  * style blockquote elements #60 from @nickschot
  * implement fake pagination component for tags & author pages #58 from @nickschot
  * Update styleguide #62 from @mansona
  * add syntax highlighting  #55 from @mansona
  * remove left margin on tag-panel and tag-post-list #57 from @Mikek2252
  * Fixing width to ensure that images are limited to container's width #56 from @akankshadharkar
  * implement post-card design #51 from @nickschot
  * implement no-widow helper & apply to titles in tag sidebar #54 from @nickschot
  * implement index page pagination #53 from @nickschot
  * add close icon to sidebar, make button square #48 from @nickschot
  * accessibility focussed sidebar refinements  #44 from @nickschot
  * fix warnings about use of EsButton #46 from @mansona

0.4.0 / 2020-05-28
==================

  * make it so that we only async load the first 3 posts in a tag #45 from @mansona
  * update empress-blog #45 from @mansona
