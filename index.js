'use strict';

const logger = hexo.log || console;
const hn = require('./lib/heading-numbering');

hexo.extend.filter.register('before_post_render', data => {
    // Skip non-post pages.
    if ('post' !== data['layout']) {
        return;
    }
    const config = hexo.config['heading_numbering'];
    if ('undefined' !== config && config['enable'] === true) {
        logger.log(`Numbering heading for: ${data.path}`);
        data.content = hn.process(data.content, config, logger);
    }
});
