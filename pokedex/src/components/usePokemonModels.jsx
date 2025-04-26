import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Pokemon3DModel = ({ modelUrl }) => {
  if (!modelUrl) {
    return <p>Model URL is invalid</p>;
  }
  try{
    const { scene } = useGLTF(modelUrl);
    return <primitive object={scene} />;
  } catch (error) {
    console.error("Error loading gltf model", error);
    return <p>Error loading model</p>
  }

};

const PokemonModelViewer = ({ modelUrl }) => {
  if (!modelUrl) {
    return <p>No model to display.</p>;
  }
  return (
    <Canvas camera={{ position: [0, 2, 5] }} className="h-40 w-40">
      <ambientLight intensity={0.7} />
      <directionalLight color="#ffffff" position={[2.5, 8, 5]} />
      <Pokemon3DModel modelUrl={modelUrl} />
      <OrbitControls />
    </Canvas>
  );
};

export default PokemonModelViewer;
