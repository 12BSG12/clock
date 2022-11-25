import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import styles from '../App.module.css';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FormGroup, InputLabel, Slider } from '@mui/material';
import {
  PresentationControls,
  Environment,
  ContactShadows,
  Html,
  RoundedBox,
  OrbitControls,
} from '@react-three/drei';

const Pentagon = ({ position, rotate, speed, args, radius, time }) => {
  const ref = React.useRef('null');
  useFrame(() => (ref.current.rotation[rotate] += speed));

  return (
    <mesh ref={ref} position={position}>
      <RoundedBox args={args} radius={radius}>
        <meshPhongMaterial color="#03CEA4" />
        <Html
          distanceFactor={18}
          position={[0, 0, 0.50]}
          transform>
          <span>{time}</span>
        </Html>
      </RoundedBox>
    </mesh>
  );
};

const SelectSmall = ({ rotate, setRotate, setSpeed, speed }) => {
  return (
    <FormGroup row sx={{ mb: 5 }}>
      <FormControl sx={{ mt: 2, mb: 1, minWidth: 135, color: 'white' }} size="small">
        <InputLabel sx={{ color: 'white' }} id="demo-select-small">
          Вращать по
        </InputLabel>
        <Select
          sx={{ color: 'white' }}
          value={rotate}
          label="Вращать по"
          onChange={(e) => setRotate(e.target.value)}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="x">X</MenuItem>
          <MenuItem value="y">Y</MenuItem>
          <MenuItem value="z">Z</MenuItem>
        </Select>
      </FormControl>
      <Slider
        step={0.01}
        valueLabelDisplay="auto"
        min={0.01}
        max={100}
        value={speed}
        onChange={(e) => setSpeed(e.target.value)}
      />
    </FormGroup>
  );
};

const Lab6 = () => {
  const [rotate, setRotate] = React.useState('');
  const [speed, setSpeed] = React.useState(0.01);

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
      <SelectSmall rotate={rotate} setRotate={setRotate} speed={speed} setSpeed={setSpeed} />
      <Canvas 
         shadows dpr={[1, 2]} camera={{ position: [4, 1, 4], fov: 50 }}>
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
          <Pentagon
            color="#03CEA4"
            args={[3, 1, 1]}
            position={[0, 1, -2]}
            radius={0.05}
            rotate={rotate}
            speed={speed}
            time={time}
          />
        </PresentationControls>
        <ContactShadows position={[0, -1.4, 0]} opacity={0.75} scale={10} blur={2.5} far={4} />
        <Environment preset="city" />
        <OrbitControls/>
      </Canvas>
    </div>
  );
};

export default Lab6;
