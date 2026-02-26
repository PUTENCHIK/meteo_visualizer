import { useSettings } from '@context/use-settings';
import { MeshGroup } from '@models_/mesh-group';
import { Center, Edges, Text3D } from '@react-three/drei';
import type { EdgesEnable } from '@shared/interfaces';
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
    const { map: settings } = useSettings();

    return (
        <MeshGroup position={position} rotation={rotation}>
            <Center>
                <Text3D font={fontsToFiles[font]} size={size} height={height}>
                    {text.trim()}
                    <meshStandardMaterial color={color} />
                    {(forceEdge === 'with' ||
                        (forceEdge !== 'without' && settings.scene.edges.enable)) && (
                        <Edges
                            color={settings.scene.edges.color}
                            threshold={settings.scene.edges.threshold}
                            scale={settings.scene.edges.scale}
                            lineWidth={settings.scene.edges.thickness}
                        />
                    )}
                </Text3D>
            </Center>
        </MeshGroup>
    );
};
