import Component from '@glimmer/component';
import moment from 'moment';
import { action } from '@ember/object';

import config from 'ember-get-config';

export default class CommentsComponent extends Component {
  scriptElementRef = null;

  get showComments () {
    return config.environment === 'production';
  }

  get useDiscourse() {
    return moment('2019-01-01').isBefore(this.args.post.date);
  }

  get oldStylePostUrl() {
    const dateUrl = moment(this.args.post.date).format('YYYY/MM/DD');
    return `https://emberjs.com/blog/${dateUrl}/${this.args.post.id}.html`
  }

  @action
  setupDiscourse() {
    window.DiscourseEmbed = {
      discourseUrl: 'https://discuss.emberjs.com/',
      discourseEmbedUrl: this.oldStylePostUrl
    };

    this.injectScript(window.DiscourseEmbed.discourseUrl + 'javascripts/embed.js');
  }

  @action
  setupDisqus() {
    const pageUrl = this.oldStylePostUrl;
    window.disqus_config = function () {
      // Replace PAGE_URL with your page's canonical URL variable
      this.page.url = pageUrl;

      // Replace PAGE_IDENTIFIER with your page's unique identifier variable
      //this.page.identifier = PAGE_IDENTIFIER;
    }

    let disqus_shortname = 'emberblog';
    this.injectScript('//' + disqus_shortname + '.disqus.com/embed.js');
  }

  injectScript(src) {
    let d = document.createElement('script');
    d.type = 'text/javascript';
    d.async = true;
    d.src = src;
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(d);
    this.scriptElementRef = d;
  }

  willDestroy() {
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

    super.willDestroy(...arguments);
  }
}
