import path from "node:path";
import { stat } from "node:fs/promises";
import { NodeIO } from "@gltf-transform/core";
import {
  KHRDracoMeshCompression,
  KHRMaterialsSpecular,
  KHRMaterialsUnlit,
} from "@gltf-transform/extensions";
import { resample, dedup, draco, prune } from "@gltf-transform/functions";
import draco3d from "draco3dgltf";

const root = path.resolve(import.meta.dirname, "..");
const publicDir = path.join(root, "public");

// Clips never played by Dragon.tsx (filtered out of `actions` there) — dead
// weight that GLTFLoader/useAnimations would otherwise still parse in full.
const deadDragonAnimations = new Set([
  "Armature|Armature|mo_0077_anim_0001|Base Layer",
  "Armature|Armature|mo_0077_anim_9001|Base Layer",
  "Armature|Armature|mo_0077_btl_0005|Base Layer",
  "Armature|Armature|mo_0077_btl_2201|Base Layer",
  "Armature|Armature|mo_0077_btl_2202|Base Layer",
]);

const io = new NodeIO()
  .registerExtensions([
    KHRDracoMeshCompression,
    KHRMaterialsSpecular,
    KHRMaterialsUnlit,
  ])
  .registerDependencies({
    "draco3d.decoder": await draco3d.createDecoderModule(),
    "draco3d.encoder": await draco3d.createEncoderModule(),
  });

async function build(name, { srcRelative, outRelative, dropAnimations }) {
  const srcPath = path.join(publicDir, srcRelative);
  const outPath = path.join(publicDir, outRelative);

  const doc = await io.read(srcPath);
  const rootNode = doc.getRoot();

  for (const anim of rootNode.listAnimations()) {
    if (dropAnimations?.has(anim.getName())) anim.dispose();
  }

  await doc.transform(resample(), dedup(), prune(), draco({ method: "edgebreaker" }));

  await io.write(outPath, doc);

  const [srcSize, outSize] = await Promise.all([
    stat(srcPath).catch(() => ({ size: 0 })),
    stat(outPath),
  ]);
  console.log(
    `${name}: ${(outSize.size / 1024 / 1024).toFixed(2)} MiB (source .gltf was ${(srcSize.size / 1024).toFixed(1)} KiB, plus .bin)`,
  );
}

await build("fatalis/scene-compressed.glb", {
  srcRelative: "fatalis/scene.gltf",
  outRelative: "fatalis/scene-compressed.glb",
  dropAnimations: deadDragonAnimations,
});

await build("planet/scene-compressed.glb", {
  srcRelative: "planet/scene.gltf",
  outRelative: "planet/scene-compressed.glb",
});
