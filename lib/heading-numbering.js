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
 * @param content {string}
 * @param config {Object}
 * @param logger {Object}
 * @return {string}
 */
function _process(content, config, logger) {
    const options = _mergeOptions(config)
    const crumbs = [];
    let inCodeBlock = false;
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; ++i) {
        let line = lines[i];
        if (line.startsWith('<hexoPostRenderCodeBlock>')) {
            inCodeBlock = true;
        } else if (line.endsWith('</hexoPostRenderCodeBlock>')) {
            inCodeBlock = false;
        } else if (line.startsWith('#') && !inCodeBlock) {
            // Get heading level
            let level = 1;
            for (let j = 1; j < line.length; ++j) {
                if ('#' === line.charAt(j)) {
                    level += 1;
                } else {
                    break;
                }
            }
            // Update crumbs
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
            const numberedIndex = options.prefix + crumbs.join(options.separator) + options.suffix;
            lines[i] = line.substring(0, level + 1) + numberedIndex + line.substring(level + 1);
        }
    }
    return lines.join('\n');
}

module.exports = {
    process: _process
}
