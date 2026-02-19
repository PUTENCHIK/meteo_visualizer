import { useMemo } from 'react';

type AtmosphereParticleForm = 'cube' | 'sphere';

interface AtmosphereParticleProps {
    size: number;
    form: AtmosphereParticleForm;
    segments?: number;
    opacity?: number;
}

export const AtmosphereParticle = ({
    size,
    form,
    segments = 8,
    opacity = 0.5,
}: AtmosphereParticleProps) => {
    const materialProps = useMemo(
        () => ({
            transparent: true,
            opacity: opacity,
            depthWrite: false,
        }),
        [opacity],
    );

    return (
        <>
            {form === 'cube' && <boxGeometry args={[size, size, size]} />}
            {form === 'sphere' && <sphereGeometry args={[size / 2, segments, segments]} />}
            <meshBasicMaterial {...materialProps} />
        </>
    );
};
