import { basePlateColor } from '@types_/colors';

interface BasePlateModelProps {
    size: [number, number, number];
}

export const BasePlateModel = (props: BasePlateModelProps) => {
    return (
        <mesh position={[0, -props.size[1] / 2, 0]}>
            <boxGeometry args={props.size} />
            <meshStandardMaterial color={basePlateColor} />
        </mesh>
    );
};
