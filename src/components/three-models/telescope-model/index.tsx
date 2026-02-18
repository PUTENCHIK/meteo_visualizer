import { Edges } from '@react-three/drei';
import { edgesColor as edgesColor, telescopeModelColor } from '@shared/colors';
import { edgesEnable, edgesScale, edgesThreshold } from '@utils/consts';

interface TelescopeModelProps {
    height: number;
    radius: number;
    length: number;
}

export const TelescopeModel = ({ height, radius, length }: TelescopeModelProps) => {
    return (
        <>
            {/* Цилиндрическая часть здания */}
            <mesh position={[radius, height / 2, 0]}>
                <cylinderGeometry args={[radius, radius, height, 32]} />
                <meshStandardMaterial color={telescopeModelColor} />
                {edgesEnable && (
                    <Edges color={edgesColor} threshold={edgesThreshold} scale={edgesScale} />
                )}
            </mesh>
            {/* Основная часть здания */}
            <mesh position={[-length / 2 + radius, height / 2, 0]}>
                <boxGeometry args={[length, height, radius]} />
                <meshStandardMaterial color={telescopeModelColor} />
                {edgesEnable && (
                    <Edges color={edgesColor} threshold={edgesThreshold} scale={edgesScale} />
                )}
            </mesh>
        </>
    );
};
