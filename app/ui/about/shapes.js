import { motion } from "framer-motion-3d";
import { MotionConfig } from "framer-motion";
import { useRef, useLayoutEffect, useState, useEffect } from "react";
import { transition } from "./settings";
import { Canvas, useThree } from "@react-three/fiber";
import { useSmoothTransform } from "./use-smooth-transform";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function Shapes({ isHover, isPress, mouseX, mouseY }) {
  const lightRotateX = useSmoothTransform(mouseY, spring, mouseToLightRotation);
  const lightRotateY = useSmoothTransform(mouseX, spring, mouseToLightRotation);

  return (
    <Canvas shadows dpr={[1, 2]} resize={{ scroll: false, offsetSize: true }}>
      <Camera mouseX={mouseX} mouseY={mouseY} />
      <MotionConfig transition={transition}>
        <motion.group
          center={[0, 0, 0]}
          rotation={[lightRotateX, lightRotateY, 0]}
        >
          <Lights />
        </motion.group>
        <motion.group
          initial={false}
          animate={isHover ? "hover" : "rest"}
          dispose={null}
          variants={{
            hover: { z: isPress ? -0.9 : 0 },
          }}
        >
          <Model />
          {/* <Sphere /> */}
          <Cone />
          <Torus />
          <Icosahedron />
          <Labda2 />
          <Labda3 />
        </motion.group>
      </MotionConfig>
    </Canvas>
  );
}

export function useSharedModel(url) {
  const [model, setModel] = useState();
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(url, setModel);
  }, [url]);
  return model;
}

export function Lights() {
  return (
    <>
      <spotLight color="#61dafb" position={[-10, -10, -10]} intensity={200} />
      <spotLight color="#61dafb" position={[-10, 0, 15]} intensity={800} />
      <spotLight color="#61dafb" position={[-5, 20, 2]} intensity={500} />
      <spotLight color="#f2056f" position={[15, 10, -2]} intensity={2000} />
      <spotLight color="#f2056f" position={[15, 10, 5]} intensity={1000} />
      <spotLight color="#b107db" position={[5, -10, 5]} intensity={800} />
    </>
  );
}

export function Model() {
  const model = useSharedModel("/ball.glb");
  const mesh = useRef();

  if (!model) return null;  // Ha a modell még nem töltődött be, ne jeleníts meg semmit

  return (
    <motion.mesh
      ref={mesh}
      scale={0.75}
      rotation={[-2.5, 0, -0.3]}
      position={[-0.65, -0.5, -0.2]} 
      variants={{
         hover: { 
          z: 1.6,
          x: -0.12,
        }
      }}
    >
      <primitive object={model.scene} />
    </motion.mesh>
  );
}

// export function Sphere() {
//   return (
//     <motion.mesh position={[-0.5, -0.5, 0]} variants={{ hover: { z: 2 } }}>
//       <sphereGeometry args={[0.4]} />
//       <Material />
//     </motion.mesh>
//   );
// }

export function Cone() {
  const model = useSharedModel("/ball.glb");
  const mesh = useRef();

  if (!model) return null;  // Ha a modell még nem töltődött be, ne jeleníts meg semmit

  return (
    <motion.mesh
      ref={mesh}
      scale={0.5}
      position={[-1.6, 0.4, 0]}
      rotation={[-0.5, 0, -0.3]}
      variants={{
        hover: {
          z: 1.1,
          x: -2.25,
          rotateX: -0.2,
          rotateZ: 0.4
        }
      }}
    >
      <primitive object={model.scene} />
    </motion.mesh>
  );
}

export function Torus() {
  const model = useSharedModel("/ball.glb");
  const mesh = useRef();

  if (!model) return null;

  return (
    <motion.mesh
      ref={mesh}
      scale={0.5}  // Megmarad a Torus eredeti pozíciója
      position={[0.3, 0.75, -0.5]}
      rotation={[-0.5, 0.5, 0]}
      variants={{
        hover: {
          x: 0.5,
          y: 1,
          z: 1,
          rotateY: -0.2
        }
      }}
    >
      <primitive object={model.scene} />
    </motion.mesh>
  );
}

export function Icosahedron() {
  const model = useSharedModel("/ball.glb");
  const mesh = useRef();

  if (!model) return null;

  return (
    <motion.mesh
      ref={mesh}
      scale={0.5} // Megmarad az Icosahedron eredeti pozíciója
      position={[1.1, 0, 0]}
      rotation-z={0.5}
      variants={{
        hover: {
          x: 2.5,
          z: 1.3,
          y: 0.6,
          rotateZ: -0.5
        }
      }}
    >
      <primitive object={model.scene} />
    </motion.mesh>
  );
}

export function Labda2() {
  const model = useSharedModel("/ball.glb");
  const mesh = useRef();

  if (!model) return null;

  return (
    <motion.mesh
      ref={mesh}
      scale={0.5} // Megmarad az Icosahedron eredeti pozíciója
      position={[1.1, 0, 0]}
      rotation-z={0.5}
      variants={{
        hover: {
          x: 2.5,
          z: 1.3,
          y: 0.6,
          rotateZ: -0.5
        }
      }}
    >
      <primitive object={model.scene} />
    </motion.mesh>
  );
}

export function Labda3() {
  const model = useSharedModel("/ball.glb");
  const mesh = useRef();

  if (!model) return null;

  return (
    <motion.mesh
      ref={mesh}
      scale={0.5} // Megmarad az Icosahedron eredeti pozíciója
      position={[1.1, 0, 0]}
      rotation-z={0.5}
      variants={{
        hover: {
          x: 2.5,
          z: 1.3,
          y: 0.6,
          rotateZ: -0.5
        }
      }}
    >
      <primitive object={model.scene} />
    </motion.mesh>
  );
}


export function Material() {
  return <meshPhongMaterial color="#fff" specular="#61dafb" shininess={10} />;
}

// Adapted from https://github.com/pmndrs/drei/blob/master/src/core/PerspectiveCamera.tsx
function Camera({ mouseX, mouseY, ...props }) {
  const cameraX = useSmoothTransform(mouseX, spring, (x) => x / 350);
  const cameraY = useSmoothTransform(mouseY, spring, (y) => (-1 * y) / 350);

  const set = useThree(({ set }) => set);
  const camera = useThree(({ camera }) => camera);
  const size = useThree(({ size }) => size);
  const scene = useThree(({ scene }) => scene);
  const cameraRef = useRef();

  useLayoutEffect(() => {
    const { current: cam } = cameraRef;
    if (cam) {
      cam.aspect = size.width / size.height;
      cam.updateProjectionMatrix();
    }
  }, [size, props]);

  useLayoutEffect(() => {
    if (cameraRef.current) {
      const oldCam = camera;
      set(() => ({ camera: cameraRef.current }));
      return () => set(() => ({ camera: oldCam }));
    }
  }, [camera, cameraRef, set]);

  useLayoutEffect(() => {
    return cameraX.onChange(() => camera.lookAt(scene.position));
  }, [cameraX]);

  return (
    <motion.perspectiveCamera
      ref={cameraRef}
      fov={90}
      position={[cameraX, cameraY, 3.8]}
    />
  );
}

const spring = { stiffness: 600, damping: 30 };

const mouseToLightRotation = (v) => (-1 * v) / 140;
