import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: { include: ['tests/routes/**/*.test.ts'], environment: 'node' },
});
