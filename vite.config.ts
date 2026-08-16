/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    base: '/triage-wheel-of-misfortune/',
    plugins: [react(), tailwindcss()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './src/setupTests.ts',
        css: false,
        exclude: ['node_modules/**', 'dist/**', 'e2e/**'],
    },
});
