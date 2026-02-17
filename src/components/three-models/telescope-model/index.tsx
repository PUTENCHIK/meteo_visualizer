import { telescopeModelColor } from '@types_/colors';

interface TelescopeModelProps {
    height: number;
    radius: number;
    length: number;
}

export const TelescopeModel = (props: TelescopeModelProps) => {
    return (
        <>
            {/* Цилиндрическая часть здания */}
            <mesh position={[props.radius, props.height / 2, 0]}>
                <cylinderGeometry
                    args={[props.radius, props.radius, props.height, 32]}
                />
                <meshStandardMaterial color={telescopeModelColor} />
            </mesh>
            {/* Основная часть здания */}
            <mesh
                position={[
                    -props.length / 2 + props.radius,
                    props.height / 2,
                    0,
                ]}>
                <boxGeometry
                    args={[props.length, props.height, props.radius]}
                />
                <meshStandardMaterial color={telescopeModelColor} />
            </mesh>
        </>
    );
};
