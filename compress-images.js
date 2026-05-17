import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = path.join(process.cwd(), 'public', 'images-backup');
const outputDir = path.join(process.cwd(), 'public', 'images-optimized');

const imageExtensions = new Set(['.png', '.jpg', '.jpeg', '.JPG', '.JPEG', '.PNG']);

async function processDirectory(currentInputDir, currentOutputDir) {
    if (!fs.existsSync(currentOutputDir)) {
        fs.mkdirSync(currentOutputDir, { recursive: true });
    }

    const files = fs.readdirSync(currentInputDir);

    for (const file of files) {
        const inputPath = path.join(currentInputDir, file);
        const stat = fs.statSync(inputPath);

        if (stat.isDirectory()) {
            await processDirectory(inputPath, path.join(currentOutputDir, file));
        } else {
            const ext = path.extname(file).toLowerCase();
            const originalSize = stat.size;

            if (imageExtensions.has(ext)) {
                // Change extension to .webp
                const newFileName = file.replace(new RegExp(`${ext}$`, 'i'), '.webp');
                const outputPath = path.join(currentOutputDir, newFileName);

                try {
                    await sharp(inputPath)
                        .resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
                        .webp({ quality: 80 })
                        .toFile(outputPath);
                    
                    const newSize = fs.statSync(outputPath).size;
                    const saved = ((originalSize - newSize) / originalSize * 100).toFixed(2);
                    console.log(`✅ Compressed: ${file} -> ${newFileName} | ${(originalSize/1024).toFixed(1)}KB -> ${(newSize/1024).toFixed(1)}KB (-${saved}%)`);
                } catch (err) {
                    console.error(`❌ Error compressing ${file}:`, err.message);
                }
            } else {
                // Copy non-image files as-is
                const outputPath = path.join(currentOutputDir, file);
                fs.copyFileSync(inputPath, outputPath);
                console.log(`➡️  Copied: ${file}`);
            }
        }
    }
}

console.log('Starting image compression...');
processDirectory(inputDir, outputDir).then(() => {
    console.log('Done! All images compressed to .webp');
});
