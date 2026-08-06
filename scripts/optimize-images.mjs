import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const publicDir = path.join(root, "public");
const assetsDir = path.join(root, "src", "assets");

const heroMaxWidth = 1920;
const projectMaxWidth = 960;
const avatarMaxWidth = 128;

async function writeWebp(inputPath, outputPath, { maxWidth, quality }) {
  const image = sharp(inputPath);
  const meta = await image.metadata();
  const width =
    meta.width && meta.width > maxWidth ? maxWidth : meta.width ?? maxWidth;

  await image
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(outputPath);

  const [srcSize, outSize] = await Promise.all([
    stat(inputPath),
    stat(outputPath),
  ]);

  return { srcSize: srcSize.size, outSize: outSize.size };
}

await mkdir(publicDir, { recursive: true });

const hero = await writeWebp(
  path.join(assetsDir, "herobg.png"),
  path.join(publicDir, "herobg.webp"),
  { maxWidth: heroMaxWidth, quality: 78 },
);
console.log(
  `herobg.webp: ${(hero.outSize / 1024).toFixed(1)} KiB (was ${(hero.srcSize / 1024).toFixed(1)} KiB)`,
);

const avatar = await writeWebp(
  path.join(assetsDir, "vinithkumar.png"),
  path.join(assetsDir, "vinithkumar.webp"),
  { maxWidth: avatarMaxWidth, quality: 82 },
);
console.log(
  `vinithkumar.webp: ${(avatar.outSize / 1024).toFixed(1)} KiB (was ${(avatar.srcSize / 1024).toFixed(1)} KiB)`,
);

for (const name of ["carrent.png", "jobit.png", "tripguide.png"]) {
  const base = name.replace(/\.png$/, "");
  const result = await writeWebp(
    path.join(assetsDir, name),
    path.join(assetsDir, `${base}.webp`),
    { maxWidth: projectMaxWidth, quality: 80 },
  );
  console.log(
    `${base}.webp: ${(result.outSize / 1024).toFixed(1)} KiB (was ${(result.srcSize / 1024).toFixed(1)} KiB)`,
  );
}
