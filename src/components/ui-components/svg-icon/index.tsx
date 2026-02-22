import clsx from 'clsx';
import s from './svg-icon.module.scss';
import { type IconName, type IconSize } from '@shared/icons';
import { iconFiles, sizesToStrokes } from '@utils/consts';

interface SvgIconProps {
    iconName: IconName;
    size: IconSize;
    strokeWidth?: number;
    color?: string;
    primary?: boolean;
    disabled?: boolean;
}

export const SvgIcon = ({
    iconName,
    size,
    strokeWidth,
    color,
    primary = false,
    disabled = false,
}: SvgIconProps) => {
    const SvgIcon = iconFiles[iconName];

    return (
        <SvgIcon
            className={clsx(
                s['svg-icon'],
                color && s['custom-color'],
                primary && !color && s['primary'],
                disabled && !color && s['disabled'],
            )}
            width={size}
            height={size}
            strokeWidth={strokeWidth ?? sizesToStrokes[size]}
            color={color}
        />
    );
};
