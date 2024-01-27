import { KeyboardControls } from "@react-three/drei";
import { Canvas} from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense, useMemo } from "react";
import { Experience } from "./components/Game";

const gravityValue = 20;

export const Controls = {
  forward: "forward",
  back: "back",
  left: "left",
  right: "right",
  jump: "jump",
};

export const Controls2 = {
  forward2: "forward2",
  back2: "back2",
  left2: "left2",
  right2: "right2",
  jump2: "jump2",
};

function App() {
  const map = useMemo(
    () => [
      { name: Controls.forward, keys: ["KeyW"] },
      { name: Controls.back, keys: ["KeyS"] },
      { name: Controls.left, keys: ["KeyA"] },
      { name: Controls.right, keys: ["KeyD"] },
      { name: Controls.jump, keys: ["Space"] },

      { name: Controls2.forward2, keys: ["ArrowUp"] },
      { name: Controls2.back2, keys: ["ArrowDown"] },
      { name: Controls2.left2, keys: ["ArrowLeft"] },
      { name: Controls2.right2, keys: ["ArrowRight"] },
      { name: Controls2.jump2, keys: ["Enter"] },
    ],
    []
  );

  return (
    <KeyboardControls map={map}>
      <Canvas shadows camera={{ position: [20, 10, 20], fov: 50}} style={{height:900}}>
        <color attach="background" args={[0,255,255]} />
        <Suspense>
          <Physics debug gravity={[0, -gravityValue, 0]}>
            <Experience />
          </Physics>
        </Suspense>
      </Canvas>
    </KeyboardControls>
  );
}

export default App;