import { MeshGroup } from '@models_/mesh-group';
import { Center, Edges, Text3D } from '@react-three/drei';
import { edgesColor } from '@shared/colors';
import type { EdgesEnable } from '@shared/interfaces';
import { edgesEnable, edgesScale, edgesThreshold } from '@utils/consts';
import { Vector3 } from 'three';

type TextFont = 'roboto';

const fontsToFiles: Record<TextFont, string> = {
    roboto: '/roboto_regular.json',
};

interface TextMeshProps extends EdgesEnable {
    text: string;
    color?: string;
    position?: Vector3;
    rotation?: Vector3;
    font?: TextFont;
    size?: number;
    height?: number;
}

export const TextMesh = ({
    text,
    color,
    position = new Vector3(),
    rotation = new Vector3(),
    font = 'roboto',
    size,
    height,
    forceEdges: forceEdge,
}: TextMeshProps) => {
    return (
        <MeshGroup position={position} rotation={rotation}>
            <Center>
                <Text3D font={fontsToFiles[font]} size={size} height={height}>
                    {text.trim()}
                    <meshStandardMaterial color={color} />
                    {(forceEdge === 'with' || (forceEdge !== 'without' && edgesEnable)) && (
                        <Edges color={edgesColor} threshold={edgesThreshold} scale={edgesScale} />
                    )}
                </Text3D>
            </Center>
        </MeshGroup>
    );
};
