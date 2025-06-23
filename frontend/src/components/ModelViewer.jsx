import React, { useRef, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { FBXLoader } from "three-stdlib";
import { AnimationMixer } from "three";

const ModelViewer = ({ modelPath }) => {
  const modelRef = useRef();
  const fbx = useLoader(FBXLoader, modelPath);
  const mixer = useRef(null);

  useEffect(() => {
    if (fbx.animations.length > 0) {
      mixer.current = new AnimationMixer(fbx);
      const action = mixer.current.clipAction(fbx.animations[0]);
      action.play();
    }

    // ✅ DO NOT ROTATE Y — this keeps the model facing forward
    if (modelRef.current) {
      modelRef.current.rotation.y = 0; // front-facing
    }
  }, [fbx]);

  useFrame((_, delta) => {
    if (mixer.current) {
      mixer.current.update(delta);
    }
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 4, 4]} intensity={1.2} />
      <directionalLight position={[-2, 2, -2]} intensity={0.4} />

      {/* Model */}
      <primitive
        ref={modelRef}
        object={fbx}
        scale={0.014}
        position={[-0.5, -2.1, -1.9]} // X-axis ← shift left
      />

      {/* Camera control */}
      <OrbitControls
        enableZoom={false}
        enableRotate={false}
        enablePan={false}
      />

      <Environment preset="city" />
    </>
  );
};

export default ModelViewer;
