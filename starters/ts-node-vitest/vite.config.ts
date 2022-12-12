import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  base: './',
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: [`${__dirname}/setupTests.ts`],
  },
});
