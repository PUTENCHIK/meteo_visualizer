interface MeshGroupProps {
    children: React.ReactNode;
    position: [number, number, number];
    rotation?: [number, number, number];
    scale?: [number, number, number] | number;
}

export const MeshGroup = (props: MeshGroupProps) => {
    return (
        <group
            position={props.position}
            rotation={props.rotation}
            scale={props.scale}>
            {props.children}
        </group>
    );
};
