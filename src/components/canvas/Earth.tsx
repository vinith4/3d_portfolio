import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import CanvasLoader from "../loader/Loader";



const Earth = ({ isMobile }: { isMobile: boolean }) => {
  const { scene } = useGLTF("./planet/scene-compressed.glb");

  return (
    <primitive
      object={scene}
      scale={isMobile ? 1.8 : 2.1}
      position={[0, -0.35, 0]}
      rotation={[0, 0, 0]}
    />
  );
};

const EarthCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleMediaChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(event.matches);
    };

    handleMediaChange(mediaQuery);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleMediaChange);
      return () => mediaQuery.removeEventListener("change", handleMediaChange);
    }

    mediaQuery.addListener(handleMediaChange);
    return () => mediaQuery.removeListener(handleMediaChange);
  }, []);

  return (
    <div className="w-full h-full min-h-[420px] sm:min-h-[520px] md:min-h-[580px] lg:min-h-[640px]">
      <Canvas
        shadows
        frameloop="demand"
        dpr={[1, 2]}
        gl={{ powerPreference: "high-performance" }}
        className="w-full h-full"
        camera={{
          fov: isMobile ? 52 : 40,
          near: 0.1,
          far: 200,
          position: isMobile ? [-3.8, 2.5, 6.5] : [-4.8, 3.7, 8.2],
        }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            autoRotate
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />

          <Earth isMobile={isMobile} />

        </Suspense>
      </Canvas>
    </div>
  );
};

useGLTF.preload("./planet/scene-compressed.glb");

export default EarthCanvas;
