import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from '@svgr/rollup';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [react()],
		define: {
			'process.env': {
				NODE_ENV: mode,
				API_URL: env.API_URL,
			},
		},
		build: {
			outDir: 'dist-swc',
			emptyOutDir: true,
			rollupOptions: {
				plugins: [
					svgr({
						include: '**/*.svg',
						namedExport: 'ReactComponent',
						exportType: 'named',
					}),
				],
			},
		},
	};
});
