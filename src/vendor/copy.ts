// eslint-disable-next-line ts/ban-ts-comment
// @ts-nocheck

/**
 * insert-css
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/utils.html#copy
 */
const deselectCurrent = () => {
    const selection = document.getSelection();
    if (!selection.rangeCount) {
        return function () {};
    }
    let active = document.activeElement;

    const ranges = [];
    for (let i = 0; i < selection.rangeCount; i++) {
        ranges.push(selection.getRangeAt(i));
    }

    switch (
        active.tagName.toUpperCase() // .toUpperCase handles XHTML
    ) {
        case 'INPUT':
        case 'TEXTAREA':
            active.blur();
            break;

        default:
            active = null;
            break;
    }

    selection.removeAllRanges();
    return function () {
        selection.type === 'Caret' && selection.removeAllRanges();

        if (!selection.rangeCount) {
            ranges.forEach(function (range) {
                selection.addRange(range);
            });
        }

        active && active.focus();
    };
};

interface Options {
    debug?: boolean;
    message?: string;
    format?: string; // MIME type
    onCopy?: (clipboardData: object) => void;
}

const clipboardToIE11Formatting = {
    'text/plain': 'Text',
    'text/html': 'Url',
    default: 'Text',
};

const defaultMessage = 'Copy to clipboard: #{key}, Enter';

function format(message: string) {
    const copyKey = `${/mac os x/i.test(navigator.userAgent) ? '⌘' : 'Ctrl'}+C`;
    return message.replaceAll(/#{\s*key\s*}/g, copyKey);
}

export function copy(text: string, options?: Options): boolean {
    let message;
    let reselectPrevious;
    let range;
    let selection;
    let mark;
    let success = false;
    if (!options) {
        options = {};
    }
    try {
        reselectPrevious = deselectCurrent();

        range = document.createRange();
        selection = document.getSelection();

        mark = document.createElement('span');
        mark.textContent = text;
        // avoid screen readers from reading out loud the text
        mark.ariaHidden = 'true';
        // reset user styles for span element
        mark.style.all = 'unset';
        // prevents scrolling to the end of the page
        mark.style.position = 'fixed';
        mark.style.top = '0';
        mark.style.clip = 'rect(0, 0, 0, 0)';
        // used to preserve spaces and line breaks
        mark.style.whiteSpace = 'pre';
        // do not inherit user-select (it may be `none`)
        mark.style.webkitUserSelect = 'text';
        mark.style.MozUserSelect = 'text';
        mark.style.msUserSelect = 'text';
        mark.style.userSelect = 'text';
        mark.addEventListener('copy', function (e) {
            e.stopPropagation();
            if (options.format) {
                e.preventDefault();
                if (typeof e.clipboardData === 'undefined') {
                    // IE 11
                    console.warn('unable to use e.clipboardData');
                    console.warn('trying IE specific stuff');
                    window.clipboardData.clearData();
                    const myFormat = clipboardToIE11Formatting[options.format] || clipboardToIE11Formatting.default;
                    window.clipboardData.setData(myFormat, text);
                } else {
                    // all other browsers
                    e.clipboardData.clearData();
                    e.clipboardData.setData(options.format, text);
                }
            }
            if (options.onCopy) {
                e.preventDefault();
                options.onCopy(e.clipboardData);
            }
        });

        document.body.append(mark);

        range.selectNodeContents(mark);
        selection.addRange(range);

        const successful = document.execCommand('copy');
        if (!successful) {
            throw new Error('copy command was unsuccessful');
        }
        success = true;
    } catch (error) {
        console.error('unable to copy using execCommand:', error);
        console.warn('trying IE specific stuff');
        try {
            window.clipboardData.setData(options.format || 'text', text);
            options.onCopy && options.onCopy(window.clipboardData);
            success = true;
        } catch (error) {
            console.error('unable to copy using clipboardData:', error);
            console.error('falling back to prompt');
            message = format('message' in options ? options.message : defaultMessage);
            window.prompt(message, text);
        }
    } finally {
        if (selection) {
            if (typeof selection.removeRange == 'function') {
                selection.removeRange(range);
            } else {
                selection.removeAllRanges();
            }
        }

        if (mark) {
            mark.remove();
        }
        reselectPrevious();
    }

    return success;
}
