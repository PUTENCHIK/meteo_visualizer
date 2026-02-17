import { Vector3 } from "three";

interface MeshGroupProps {
    children: React.ReactNode;
    position: Vector3;
    rotation?: Vector3;
    scale?: Vector3 | number;
}

export const MeshGroup = (props: MeshGroupProps) => {
    return (
        <group
            position={props.position}
            rotation={props.rotation?.toArray()}
            scale={props.scale}>
            {props.children}
        </group>
    );
};
