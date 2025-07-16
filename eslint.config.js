import { gupo } from '@gupo/eslint-config';

export default gupo({
    overrides: {
        unicorn: {
            'unicorn/filename-case': 'off',
            'unicorn/prefer-blob-reading-methods': 'off',
            'unicorn/no-array-callback-reference': 'off',
            'unicorn/no-new-array': 'off',
            'unicorn/prefer-string-slice': 'off',
        },
        typescript: {
            'no-alert': 'off',
            'prefer-spread': 'off',
            'unicorn/prefer-at': 'off',
            'prefer-exponentiation-operator': 'off',
            'unicorn/prefer-add-event-listener': 'off',
        },
    },
});
