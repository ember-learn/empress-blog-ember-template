/* eslint-disable prettier/prettier */
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import config from 'ember-get-config';
import { task, timeout } from 'ember-concurrency';

export default class CommentsComponent extends Component {
  scriptElementRef = null;

  // variable used to force a re-initialization of the comments when the post changes
  @tracked renderComments = true;

  // used to hide comments in non-production environments
  get commentsEnabled () {
    return config.environment === 'production';
  }

  get useDiscourse() {
    return new Date('2019-01-01') < this.args.post.date;
  }

  get oldStylePostUrl() {
    const dateUrl = this.args.post.date.toISOString().split('T')[0].replace(/-/g, '/');
    return `https://emberjs.com/blog/${dateUrl}/${this.args.post.id}.html`
  }

  get postUrl() {
    // this allows us to keep the comments working for posts that were released
    // before we moved to empress-blog
    if (this.args.post.date < new Date('2021-01-01')) {
      return this.oldStylePostUrl;
    }

    return `https://blog.emberjs.com/${this.args.post.id}/`;
  }

  @(task(function*() {
    this.cleanup();
    this.renderComments = false;
    yield timeout(0);
    this.renderComments = true;
  }).keepLatest())
  rerenderCommentsTask;

  @action
  rerenderComments() {
    this.rerenderCommentsTask.perform();
  }

  @action
  setupDiscourse() {
    window.DiscourseEmbed = {
      discourseUrl: 'https://discuss.emberjs.com/',
      discourseEmbedUrl: this.postUrl,
    };

    this.injectScript(window.DiscourseEmbed.discourseUrl + 'javascripts/embed.js');
  }

  @action
  setupDisqus() {
    const pageUrl = this.oldStylePostUrl;
    window.DiscourseEmbed = {
      discourseUrl: 'https://discuss.emberjs.com/',
      discourseEmbedUrl: pageUrl
    };

    this.injectScript(window.DiscourseEmbed.discourseUrl + 'javascripts/embed.js');
  }

  injectScript(src) {
    let d = document.createElement('script');
    d.type = 'text/javascript';
    d.async = true;
    d.src = src;
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(d);
    this.scriptElementRef = d;
  }

  @action
  cleanup() {
    if (this.scriptElementRef) {
      this.scriptElementRef.parentNode.removeChild(this.scriptElementRef);
      this.scriptElementRef = null;
    }

    if (window.DiscourseEmbed) {
      delete window.DiscourseEmbed;
    }

    if (window.disqus_config) {
      delete window.disqus_config;
    }
  }

  willDestroy() {
    this.cleanup();
    super.willDestroy(...arguments);
  }
}
