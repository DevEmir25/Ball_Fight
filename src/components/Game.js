import { Box, Cylinder, Sphere, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody, quat } from "@react-three/rapier";
import { useRef, useState } from "react";
import { Controls, Controls2 } from "../App";
import * as THREE from "three";

const jumpForce = 40;
const movementSpeed = 0.5;
const airControl = 0.2;

export const Experience = () => {
  const sphere = useRef();
  const sphere2 = useRef();
  const [start, setStart] = useState(false);
  const kicker = useRef();
  const jump = () => {
    if (isOnFloor.current) {
      sphere.current.applyImpulse({ x: 0, y: jumpForce, z: 0 });
      isOnFloor.current = false;
    }
  };

  const jump2 = () => {
    if (isOnFloor2.current) {
      sphere2.current.applyImpulse({ x: 0, y: jumpForce, z: 0 });
      isOnFloor2.current = false;
    }
  };

  const jumpPressed = useKeyboardControls((state) => state[Controls.jump]);
  const leftPressed = useKeyboardControls((state) => state[Controls.left]);
  const rightPressed = useKeyboardControls((state) => state[Controls.right]);
  const backPressed = useKeyboardControls((state) => state[Controls.back]);
  const forwardPressed = useKeyboardControls((state) => state[Controls.forward]);

  const jumpPressed2 = useKeyboardControls((state) => state[Controls2.jump2]);
  const leftPressed2 = useKeyboardControls((state) => state[Controls2.left2]);
  const rightPressed2 = useKeyboardControls((state) => state[Controls2.right2]);
  const backPressed2 = useKeyboardControls((state) => state[Controls2.back2]);
  const forwardPressed2 = useKeyboardControls((state) => state[Controls2.forward2]);

  const handleMovement = () => {
    if(isOnFloor.current){
      if (rightPressed) {
        sphere.current.applyImpulse({ x: movementSpeed, y: 0, z: 0 });
      }
      if (leftPressed) {
        sphere.current.applyImpulse({ x: -movementSpeed, y: 0, z: 0 });
      }
      if (forwardPressed) {
        sphere.current.applyImpulse({ x: 0, y: 0, z: -movementSpeed });
      }
      if (backPressed) {
        sphere.current.applyImpulse({ x: 0, y: 0, z: movementSpeed });
      }
    }
    else{
      if (rightPressed) {
        sphere.current.applyImpulse({ x: airControl, y: 0, z: 0 });
      }
      if (leftPressed) {
        sphere.current.applyImpulse({ x: -airControl, y: 0, z: 0 });
      }
      if (forwardPressed) {
        sphere.current.applyImpulse({ x: 0, y: 0, z: -airControl });
      }
      if (backPressed) {
        sphere.current.applyImpulse({ x: 0, y: 0, z: airControl });
      }
    }

    if(isOnFloor2.current){
      if (rightPressed2) {
        sphere2.current.applyImpulse({ x: movementSpeed, y: 0, z: 0 });
      }
      if (leftPressed2) {
        sphere2.current.applyImpulse({ x: -movementSpeed, y: 0, z: 0 });
      }
      if (forwardPressed2) {
        sphere2.current.applyImpulse({ x: 0, y: 0, z: -movementSpeed });
      }
      if (backPressed2) {
        sphere2.current.applyImpulse({ x: 0, y: 0, z: movementSpeed });
      }
    }
    else{
      if (rightPressed2) {
        sphere2.current.applyImpulse({ x: airControl, y: 0, z: 0 });
      }
      if (leftPressed2) {
        sphere2.current.applyImpulse({ x: -airControl, y: 0, z: 0 });
      }
      if (forwardPressed2) {
        sphere2.current.applyImpulse({ x: 0, y: 0, z: -airControl });
      }
      if (backPressed2) {
        sphere2.current.applyImpulse({ x: 0, y: 0, z: airControl });
      }
    }
  };

  {/*Dönen cubugun hizi*/}
  const speed = useRef(3);

  useFrame((_state, delta) => {
    if (jumpPressed) {
      jump();
    }
    if (jumpPressed2) {
      jump2();
    }
    handleMovement();

    if (!start) {
      return;
    }
    const curRotation = quat(kicker.current.rotation());
    const incrementRotation = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      delta * speed.current
    );
    curRotation.multiply(incrementRotation);
    kicker.current.setNextKinematicRotation(curRotation);
  });

  const isOnFloor = useRef(true);
  const isOnFloor2 = useRef(true);


  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[-10, 10, 0]} intensity={0.4} />
      
      {/*İlk Top*/}
      <RigidBody
        colliders='ball'
        position={[-2.5, 10, 3]}
        ref={sphere}
        onCollisionEnter={({ other }) => {
          if (other.rigidBodyObject.name === "floor") {
            isOnFloor.current = true;
            setStart(true);
          }
          if(other.rigidBodyObject.name === "deadzone"){
            window.location.reload();
          }
        }}
        onCollisionExit={({ other }) => {
          if (other.rigidBodyObject.name === "floor") {
            isOnFloor.current = false;
          }
        }}
      >
        {/*Kontrol ettiğimiz küre*/}
        <Sphere>
          <meshStandardMaterial color="orange" />
        </Sphere>
      </RigidBody>

      {/*İkinci Top*/}
      <RigidBody
        colliders='ball'
        position={[2.5, 10, 3]}
        ref={sphere2}
        onCollisionEnter={({ other }) => {
          if (other.rigidBodyObject.name === "floor") {
            isOnFloor2.current = true;
            setStart(true);
          }
          if(other.rigidBodyObject.name === "deadzone"){
            window.location.reload();
          }
        }}
        onCollisionExit={({ other }) => {
          if (other.rigidBodyObject.name === "floor") {
            isOnFloor2.current = false;
          }
        }}
      >
        {/*Kontrol ettiğimiz küre*/}
        <Sphere>
          <meshStandardMaterial color="springgreen" />
        </Sphere>
      </RigidBody>

        {/*Dönen Cubuk*/}
      <RigidBody type="kinematicPosition" position={[0, 0, 0]} ref={kicker} colliders='cuboid' >
        <group position={[1, 1, 1]}>
          <Box args={[19, 0.5, 0.5]}>
            <meshStandardMaterial color="red" />
          </Box>
        </group>
      </RigidBody>

      {/*Zemin*/}
      <RigidBody type="fixed" name="floor" colliders='trimesh'>
        <Cylinder position={[0, 0, 0]} args={[10, 10, 1]}>
          <meshStandardMaterial color="yellow" />
        </Cylinder>
      </RigidBody>

      {/*DeadZone*/}
      <RigidBody type="fixed" name="deadzone" colliders='cuboid'>
        <Cylinder position={[0, -5, 0]} args={[100, 100, 0.5]}>
          <meshStandardMaterial color='blue' />
        </Cylinder>
      </RigidBody>
    </>
  );
};