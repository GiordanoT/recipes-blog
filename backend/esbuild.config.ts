import * as esbuild from 'esbuild';
import dotenv from 'dotenv';

// Change the environment (production|docker) depends on your need.
dotenv.config({path: '.env.production'});
esbuild.build({
    entryPoints: ['./src/app.ts'],
    bundle: true,
    platform: 'node',
    outfile: './dist/main.bundle.js',
    loader: {'.ts': 'ts'},
    define: {
        'process.env.MONGODB_URL': `'${process.env['MONGODB_URL']}'`,
        'process.env.DOMAIN': `'${process.env['DOMAIN']}'`
    }
}).then(() => console.log('⚡ Bundle Build Completed ⚡'))
