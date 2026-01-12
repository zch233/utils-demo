import esbuild from 'rollup-plugin-esbuild';
import dts from 'rollup-plugin-dts';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import alias from '@rollup/plugin-alias';

const entries = ['src/index.ts', 'src/hooks/index.ts'];

const plugins = [
    alias({
        entries: [{ find: /^node:(.+)$/, replacement: '$1' }],
    }),
    resolve({
        preferBuiltins: true,
    }),
    json(),
    esbuild({
        target: 'node14',
    }),
    commonjs(),
];

export default [
    ...entries.map(input => ({
        input,
        output: [
            {
                file: input.replace('src/', 'dist/').replace('.ts', '.mjs'),
                format: 'esm',
            },
            {
                file: input.replace('src/', 'dist/').replace('.ts', '.cjs'),
                format: 'cjs',
            },
        ],
        external: ['vue', 'vue-router'],
        plugins,
    })),
    ...entries.map(input => ({
        input,
        output: [
            {
                file: input.replace('src/', 'dist/').replace('.ts', '.d.ts'),
                format: 'es',
            },
            {
                file: input.replace('src/', 'dist/').replace('.ts', '.d.mts'),
                format: 'esm',
            },
            {
                file: input.replace('src/', 'dist/').replace('.ts', '.d.cts'),
                format: 'cjs',
            },
        ],
        external: ['lodash-es', 'vue', 'vue-router'],
        plugins: [dts()],
    })),
];
