/* eslint-env node */
module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'test', 'perf', 'chore']],
        'scope-empty': [1, 'never'],
        'subject-case': [0, 'always'],
        'scope-case': [0],
    },
};
