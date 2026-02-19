import { BoxMesh } from '@models_/box-mesh';
import { telescopeModelColor } from '@shared/colors';
import { CylinderMesh } from '@models_/cylinder-mesh';
import { Vector3 } from 'three';

interface TelescopeModelProps {
    height: number;
    radius: number;
    length: number;
}

export const TelescopeModel = ({ height, radius, length }: TelescopeModelProps) => {
    return (
        <>
            {/* Цилиндрическая часть здания */}
            <CylinderMesh
                radius={radius}
                height={height}
                position={new Vector3(radius, height / 2, 0)}
                color={telescopeModelColor}
            />
            {/* Основная часть здания */}
            <BoxMesh
                size={new Vector3(length, height, radius)}
                position={new Vector3(-length / 2 + radius, height / 2, 0)}
                color={telescopeModelColor}
            />
        </>
    );
};
