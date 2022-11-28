import React from 'react';
import { Canvas } from '@react-three/fiber';
import styles from '../App.module.css';
import {
  PresentationControls,
  Environment,
  ContactShadows,
  Html,
  RoundedBox,
  OrbitControls,
} from '@react-three/drei';

const Clock = ({ position, args, radius, time }) => {
  return (
    <mesh position={position}>
      <RoundedBox args={args} radius={radius}>
        <meshPhongMaterial color="#03CEA4" />
        <Html distanceFactor={18} position={[0, 0, 0.5]} transform>
          <span>{time}</span>
        </Html>
      </RoundedBox>
    </mesh>
  );
};

const ClockLegs = ({ position, args, radius, rotation }) => {
  return (
    <mesh position={position}>
      <RoundedBox args={args} radius={radius} rotation={rotation}>
        <meshPhongMaterial color="#18181f" />
      </RoundedBox>
    </mesh>
  );
};
const ClockBtn= ({ position, args, radius, rotation }) => {
  return (
    <mesh position={position}>
      <RoundedBox args={args} radius={radius} rotation={rotation}>
        <meshPhongMaterial color="#18181f" />
      </RoundedBox>
    </mesh>
  );
};

const Lab7 = () => {
  const [time, setTime] = React.useState(new Date().toLocaleTimeString());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.root}>
      <p>Лабораторная работа №7 </p>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [4, 1, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          shadow-mapSize={[512, 512]}
          castShadow
        />
        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
          rotation={[0, 0.8, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}>
          <Clock color="#03CEA4" args={[3, 1, 1]} position={[0, 1, -2]} radius={0.05} time={time} />
          <ClockBtn
            color="#03CEA4"
            args={[0.3, 0.2, 0.2]}
            position={[1.1, 1.5, -1.7]}
            radius={0.05}
          />
          <ClockBtn
            color="#03CEA4"
            args={[0.3, 0.2, 0.2]}
            position={[0.6, 1.5, -1.7]}
            radius={0.05}
          />
          <ClockBtn
            color="#03CEA4"
            args={[0.3, 0.2, 0.2]}
            position={[0.1, 1.5, -1.7]}
            radius={0.05}
          />

          <ClockLegs
            color="#03CEA4"
            args={[1.8, 0.2, 0.2]}
            position={[1.2, 0, -2]}
            radius={0.05}
            rotation={[0.2, 1.6, 0.5]}
          />
          <ClockLegs
            color="#03CEA4"
            args={[1.8, 0.2, 0.2]}
            position={[1.2, 0, -2]}
            radius={0.05}
            rotation={[0.2, 1.6, -0.9]}
          />
          <ClockLegs
            color="#03CEA4"
            args={[1.8, 0.2, 0.2]}
            position={[-1.2, 0, -2]}
            radius={0.05}
            rotation={[0.2, 1.6, 0.5]}
          />
          <ClockLegs
            color="#03CEA4"
            args={[1.8, 0.2, 0.2]}
            position={[-1.2, 0, -2]}
            radius={0.05}
            rotation={[0.2, 1.6, -0.9]}
          />
        </PresentationControls>
        <ContactShadows position={[0, -1.4, 0]} opacity={0.75} scale={10} blur={2.5} far={4} />
        <Environment preset="city" />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Lab7;
