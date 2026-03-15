import building from '@assets/building.svg?react';
import compass from '@assets/compass.svg?react';
import telescope from '@assets/telescope.svg?react';
import wind from '@assets/wind.svg?react';
import camera from '@assets/camera.svg?react';
import scene from '@assets/scene.svg?react';
import arrow from '@assets/arrow.svg?react';
import cross from '@assets/cross.svg?react';
import bin from '@assets/bin.svg?react';
import eye from '@assets/eye.svg?react';

export type IconName =
    | 'building'
    | 'compass'
    | 'telescope'
    | 'wind'
    | 'camera'
    | 'scene'
    | 'arrow'
    | 'cross'
    | 'bin'
    | 'eye';

export type IconSize = 48 | 36 | 24 | 20 | 16 | 12;

export const iconFiles: Record<IconName, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
    building: building,
    compass: compass,
    telescope: telescope,
    wind: wind,
    camera: camera,
    scene: scene,
    arrow: arrow,
    cross: cross,
    bin: bin,
    eye: eye,
};

export const sizesToStrokes: Record<IconSize, number> = {
    48: 2,
    36: 2,
    24: 2,
    20: 2,
    16: 3,
    12: 3,
};
