import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  PerformanceMonitor,
  Preload,
  useAnimations,
  useGLTF,
} from "@react-three/drei";

import * as THREE from "three";

import CanvasLoader from "../loader/Loader";
import { useCanvasVisibility } from "../../utils/useCanvasVisibility";
import { useIsMobile } from "../../utils/useIsMobile";

interface DragonProps {
  isMobile: boolean;
}

// Animations to exclude
const excludedAnimations = [
  "Armature|Armature|mo_0077_anim_0001|Base Layer",
  "Armature|Armature|mo_0077_anim_9001|Base Layer",
  "Armature|Armature|mo_0077_btl_0005|Base Layer",
  "Armature|Armature|mo_0077_btl_2201|Base Layer",
  "Armature|Armature|mo_0077_btl_2202|Base Layer",
];

const Dragon = ({ isMobile }: DragonProps) => {
  const group = useRef<THREE.Group>(null);

  const { scene, animations } = useGLTF("./fatalis/scene-compressed.glb");

  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Enable shadows for every mesh
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.frustumCulled = true;
        child.castShadow = !isMobile;
        child.receiveShadow = !isMobile;
      }
    });
    // Get all playable animations
    const availableAnimations = Object.keys(actions).filter(
      (name) => !excludedAnimations.includes(name),
    );

    // Pick a random animation
    const randomAnimation =
      availableAnimations[
        Math.floor(Math.random() * availableAnimations.length)
      ];

    const action = actions[randomAnimation];

    action?.reset().setLoop(THREE.LoopRepeat, Infinity).fadeIn(0.5).play();

    return () => {
      action?.fadeOut(0.5);
    };
  }, [actions, scene, isMobile]);

  const shadowMapSize = isMobile ? 1024 : 2048;

  return (
    <>
      {/* ====================================================== */}
      {/* 1. Ambient Light                                      */}
      {/* Adds overall brightness to the whole model            */}
      {/* Increase intensity -> brighter scene                  */}
      {/* ====================================================== */}
      <ambientLight intensity={isMobile ? 0.85 : 0.7} />

      {/* ====================================================== */}
      {/* 2. Hemisphere Light                                   */}
      {/* Simulates sky + ground lighting                       */}
      {/* ====================================================== */}
      <hemisphereLight groundColor="black" intensity={0.35} />

      {/* ====================================================== */}
      {/* 3. Main Sun Light (Most Important)                    */}
      {/* Controls overall lighting and shadows                 */}
      {/* ====================================================== */}
      <directionalLight
        position={[10, 12, 8]}
        intensity={1.2}
        castShadow={!isMobile}
        shadow-mapSize-width={shadowMapSize}
        shadow-mapSize-height={shadowMapSize}
      />

      {/* ====================================================== */}
      {/* 4. Front Fill Light                                   */}
      {/* Brightens the dragon's face                           */}
      {/* ====================================================== */}
      <pointLight position={[5, 5, 6]} intensity={0.8} color="#ffffff" />

      {!isMobile && (
        <>
          {/* ====================================================== */}
          {/* 5. Blue Rim Light                                    */}
          {/* Gives cool edge highlight                            */}
          {/* ====================================================== */}
          <pointLight position={[-8, 5, -5]} intensity={0.5} color="#4f8cff" />

          {/* ====================================================== */}
          {/* 6. Orange Rim Light                                  */}
          {/* Gives warm cinematic look                            */}
          {/* ====================================================== */}
          <pointLight position={[8, 5, -5]} intensity={0.5} color="#ff8844" />

          {/* ====================================================== */}
          {/* 7. Top Spotlight                                     */}
          {/* Highlights dragon from above                         */}
          {/* ====================================================== */}
          <spotLight
            position={[0, 10, 0]}
            intensity={1.2}
            angle={0.4}
            penumbra={0.7}
          />

          {/* ====================================================== */}
          {/* HDR Environment                                      */}
          {/* Makes materials look much more realistic             */}
          {/* Try: city | studio | sunset | warehouse | dawn       */}
          {/* ====================================================== */}
          <Environment preset="dawn" background={false} />
        </>
      )}

      {/* Dragon Model */}
      <group ref={group}>
        <primitive
          object={scene}
          scale={isMobile ? 0.35 : 0.5}
          position={isMobile ? [0, -1.7, 0] : [0, -2.4, 0]}
          rotation={[0, Math.PI / 4, 0]}
        />
      </group>

      {/* ====================================================== */}
      {/* Ground Contact Shadow                                 */}
      {/* Soft realistic shadow under the dragon                */}
      {/* ====================================================== */}
      <ContactShadows
        position={[0, -2.8, 0]}
        opacity={isMobile ? 0.55 : 0.7}
        scale={25}
        blur={isMobile ? 2 : 3}
        far={8}
        resolution={isMobile ? 256 : 512}
      />
    </>
  );
};

const DragonCanvas = () => {
  const isMobile = useIsMobile(500);
  const { ref, visible } = useCanvasVisibility("120px", true);
  const [dpr, setDpr] = useState(isMobile ? 1.25 : 2);

  return (
    <div ref={ref} className="absolute inset-0">
      <Canvas
        shadows={!isMobile}
        dpr={isMobile ? [1, 1.25] : [1, dpr]}
        frameloop={visible ? "always" : "never"}
        camera={{
          position: [0, 2, 9],
          fov: 40,
        }}
        gl={{
          antialias: !isMobile,
          powerPreference: "high-performance",
          alpha: true,
        }}
      >
        {!isMobile && (
          <PerformanceMonitor
            bounds={() => [40, 70]}
            flipflops={3}
            onDecline={() => setDpr(1)}
            onIncline={() => setDpr(2)}
          />
        )}

        <Suspense fallback={<CanvasLoader />}>
          {/* Camera Controls */}
          <OrbitControls
            autoRotate={visible}
            autoRotateSpeed={0.5}
            enableZoom
            enablePan={false}
            enableDamping
            dampingFactor={0.08}
            minDistance={7}
            maxDistance={9}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.7}
          />

          <Dragon isMobile={isMobile} />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

useGLTF.preload("./fatalis/scene-compressed.glb");

export default DragonCanvas;
