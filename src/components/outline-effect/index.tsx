import { useThree } from '@react-three/fiber';
import {
    EffectComposer,
    Outline,
    Selection,
} from '@react-three/postprocessing';
import { KernelSize } from 'postprocessing';

interface OutlineEffectProps {
    children: React.ReactNode;
}

export const OutlineEffect = (props: OutlineEffectProps) => {
    const { size } = useThree();

    return (
        <Selection>
            <EffectComposer multisampling={8} autoClear={false}>
                <Outline
                    edgeStrength={2.5}
                    width={size.width}
                    height={size.height}
                    kernelSize={KernelSize.LARGE}
                    blur={true}
                    pulseSpeed={0.5}
                    visibleEdgeColor={0xff0000}
                    hiddenEdgeColor={0x640000}
                    blendFunction={29}
                />
            </EffectComposer>
            {props.children}
        </Selection>
    );
};
