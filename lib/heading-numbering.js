/**
 * Default config.
 * @private
 */
const _defaultOptions = {
    separator: '.',
    prefix: '',
    suffix: ' '
};

/**
 * Merge user options with default options.
 * @private
 * @param config {Object}
 * @return {Object}
 */
function _mergeOptions(config) {
    const options = config || {};
    for (const key of Object.keys(_defaultOptions)) {
        if ('undefined' === typeof options[key]) {
            options[key] = _defaultOptions[key];
        }
    }
    return options;
}

/**
 * @private
 */
const _regexHeadingLine = /^(#+)\s+(.*)$/;

/**
 * @param content {string}
 * @param config {Object}
 * @param logger {Object}
 * @return {string}
 */
function _process(content, config, logger) {
    const options = _mergeOptions(config)

    let inCodeBlock = false;
    const crumbs = [];
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; ++i) {
        let line = lines[i];
        if (line.startsWith('<hexoPostRenderCodeBlock>')) {
            if (!line.endsWith('</hexoPostRenderCodeBlock>')) {
                inCodeBlock = true;
            }
        } else if (line.endsWith('</hexoPostRenderCodeBlock>')) {
            inCodeBlock = false;
        } else if (!inCodeBlock) {
            const m = line.match(_regexHeadingLine);
            if(m === null) {
                continue;
            }
            const tag = m[1], title = m[2];
            // Update crumbs
            const level = tag.length;
            if (crumbs.length > level) {
                crumbs.splice(level);
            }
            for (let j = 0; j < level; ++j) {
                if ('undefined' === typeof crumbs[j]) {
                    crumbs[j] = 1;
                } else if (level - 1 === j) {
                    crumbs[j] += 1;
                }
            }
            // Update heading
            const numberedIndex = crumbs.join(options.separator);
            lines[i] = `${tag} ${options.prefix}${numberedIndex}${options.suffix}${title}`;
        }
    }
    return lines.join('\n');
}

module.exports = {
    process: _process
}
