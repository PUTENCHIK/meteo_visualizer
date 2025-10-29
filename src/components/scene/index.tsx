import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { TestBox } from '@components/test-box';
import './scene.css';

export const Scene = () => {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />

            <TestBox position={[-1.2, 0, 0]} />
            <TestBox position={[1.2, 0, 0]} />

            <OrbitControls />
        </Canvas>
    );
};
