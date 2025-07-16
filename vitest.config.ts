import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    resolve: {
        alias: {
            '@utils': resolve(__dirname, 'src/index.ts'),
        },
    },
    test: {
        environment: 'happy-dom',
    },
});
