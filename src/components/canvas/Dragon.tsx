import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  Preload,
  useAnimations,
  useGLTF,
} from "@react-three/drei";

import * as THREE from "three";

import CanvasLoader from "../loader/Loader";

interface DragonProps {
  isMobile: boolean;
}

const Dragon = ({ isMobile }: DragonProps) => {
  const group = useRef<THREE.Group>(null);

  const { scene, animations } = useGLTF("./fatalis/scene.gltf");

  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Enable shadows for every mesh
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    // Pick a random animation clip each load
    const actionKeys = Object.keys(actions);
    const randomActionKey = actionKeys[Math.floor(Math.random() * actionKeys.length)];
    const action = actions[randomActionKey];

    action?.reset().setLoop(THREE.LoopRepeat, Infinity).fadeIn(0.5).play();

    return () => {
      action?.fadeOut(0.5);
    };
  }, [actions, scene]);

  return (
    <>
      {/* ====================================================== */}
      {/* 1. Ambient Light                                      */}
      {/* Adds overall brightness to the whole model            */}
      {/* Increase intensity -> brighter scene                  */}
      {/* ====================================================== */}
      <ambientLight intensity={0.7} />

      {/* ====================================================== */}
      {/* 2. Hemisphere Light                                  */}
      {/* Simulates sky + ground lighting                      */}
      {/* ====================================================== */}
      <hemisphereLight groundColor="black" intensity={0.35} />

      {/* ====================================================== */}
      {/* 3. Main Sun Light (Most Important)                   */}
      {/* Controls overall lighting and shadows                */}
      {/* ====================================================== */}
      <directionalLight
        position={[10, 12, 8]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* ====================================================== */}
      {/* 4. Front Fill Light                                  */}
      {/* Brightens the dragon's face                          */}
      {/* ====================================================== */}
      <pointLight position={[5, 5, 6]} intensity={0.8} color="#ffffff" />

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
        castShadow
      />

      {/* ====================================================== */}
      {/* HDR Environment                                      */}
      {/* Makes materials look much more realistic             */}
      {/* Try: city | studio | sunset | warehouse | dawn       */}
      {/* ====================================================== */}
      <Environment preset="dawn" />

      {/* Dragon Model */}
      <group ref={group}>
        <primitive
          object={scene}
          scale={isMobile ? 0.35 : 0.5}
          position={isMobile ? [0, -2.1, 0] : [0, -2.4, 0]}
          rotation={[0, Math.PI / 4, 0]}
        />
      </group>

      {/* ====================================================== */}
      {/* Ground Contact Shadow                                */}
      {/* Soft realistic shadow under the dragon               */}
      {/* ====================================================== */}
      <ContactShadows
        position={[0, -2.8, 0]}
        opacity={0.7}
        scale={25}
        blur={3}
        far={8}
      />
    </>
  );
};

const DragonCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width:500px)");

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobile(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{
        position: [0, 2, 9],
        fov: 40,
      }}
      gl={{
        preserveDrawingBuffer: true,
        antialias: true,
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {/* Camera Controls */}
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.5}
          enableZoom
          enablePan
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
        />

        <Dragon isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

useGLTF.preload("./fatalis/scene.gltf");

export default DragonCanvas;