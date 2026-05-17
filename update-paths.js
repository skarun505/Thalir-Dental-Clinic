import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');

function updateFiles(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            updateFiles(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf-8');
            
            let originalContent = content;
            
            // Replace /images/ with /images-optimized/
            content = content.replace(/\/images\//g, '/images-optimized/');
            
            // Replace extensions (with word boundary or quote)
            content = content.replace(/\.png(['"])/gi, '.webp$1');
            content = content.replace(/\.jpe?g(['"])/gi, '.webp$1');
            
            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf-8');
                console.log(`Updated paths in: ${fullPath.replace(srcDir, '')}`);
            }
        }
    }
}

updateFiles(srcDir);
console.log('Finished updating image references!');
