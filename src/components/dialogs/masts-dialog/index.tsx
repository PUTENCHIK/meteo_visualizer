import clsx from 'clsx';
import s from './masts-dialog.module.scss';
import { useComplexData } from '@context/complex-data-context';
import { DialogWindow } from '@dialogs/dialog-window';
import { PolarSystemInput } from '@components/polar-system-input';
import { InputLabel } from '@components/input-label';
import { TextInput } from '@components/text-input';
import { NumberInput } from '@components/number-input';
import { getMastConfig, mastConfigs, type MastConfigName } from '@utils/complexes';
import { GuidLabel } from '@components/guid-label';
import { IconButton } from '@components/icon-button';
import { Button } from '@components/button';
import { useScene } from '@context/scene-context';
import { useSettings } from '@context/use-settings';
import { Vector3 } from 'three';

export const MastsDialog = () => {
    const { map: settings } = useSettings();
    const { masts, getMast, addMast, updateMast, deleteMast } = useComplexData();
    const { controlsRef, sceneRef } = useScene();

    const focusMast = (id: string) => {
        if (controlsRef.current && sceneRef.current) {
            const mast = getMast(id);
            const target = sceneRef.current.getObjectByName(id);

            if (mast && target) {
                const mastHeight = getMastConfig(mast?.configName).height;
                const p = new Vector3();
                target.getWorldPosition(p);
                const offset = settings.camera.focusOffset;
                const padding = settings.camera.focusPadding;

                controlsRef.current.setLookAt(
                    p.x,
                    p.y + offset / 2,
                    p.z - offset,
                    p.x,
                    p.y + mastHeight / 2,
                    p.z,
                    true,
                );
                controlsRef.current.fitToBox(target, true, {
                    paddingBottom: padding,
                    paddingTop: padding,
                    paddingLeft: padding,
                    paddingRight: padding,
                });
            } else {
                console.error(`Mast or Target mesh is undefined: ${mast}, ${target}`);
            }
        } else {
            console.error(
                `Controls and Scene objects must be set: ${controlsRef.current}, ${sceneRef.current}`,
            );
        }
    };

    return (
        <DialogWindow
            title='Мачты'
            dialogId='masts'
            widthLimits={{ min: 300 }}
            buttons={[<Button title='Добавить мачту' type='primary' onClick={addMast} />]}>
            {masts.length === 0 && (
                <div className={clsx(s['empty-label-wrapper'])}>
                    <span className={clsx(s['empty-label'])}>Нет ни одной мачты</span>
                </div>
            )}
            {masts.map((mast, index) => (
                <div key={index} className={clsx(s['mast-item'])}>
                    <div className={clsx(s['header'])}>
                        <div className={clsx(s['group'])}>
                            <span className={clsx(s['number'])}>{index + 1}.</span>
                            <GuidLabel value={mast.id} />
                        </div>
                        <div className={clsx(s['group'])}>
                            <IconButton
                                iconName='eye'
                                title='Фокус'
                                iconSize={20}
                                onClick={() => focusMast(mast.id)}
                            />
                            <IconButton
                                iconName='bin'
                                title='Удалить'
                                iconSize={20}
                                onClick={() => deleteMast(mast.id)}
                            />
                        </div>
                    </div>
                    <InputLabel label='Префикс'>
                        <TextInput
                            defaultValue={mast.prefix}
                            placeholder='west/north'
                            onChange={(value) => updateMast(mast.id, 'prefix', value)}
                        />
                    </InputLabel>
                    <InputLabel label='Описание'>
                        <TextInput
                            defaultValue={mast.description}
                            placeholder='Описание'
                            onChange={(value) => updateMast(mast.id, 'description', value)}
                        />
                    </InputLabel>
                    <InputLabel label='Положение'>
                        <PolarSystemInput
                            value={mast.position}
                            onChange={(value) => updateMast(mast.id, 'position', value)}
                        />
                    </InputLabel>
                    <InputLabel label='Угол поворота'>
                        <NumberInput
                            defaultValue={mast.rotation ?? 0}
                            postfix='°'
                            onChange={(value) => updateMast(mast.id, 'rotation', value)}
                        />
                    </InputLabel>
                    <InputLabel label='Конфиг'>
                        <select
                            defaultValue={mast.configName}
                            onChange={(event) =>
                                updateMast(
                                    mast.id,
                                    'configName',
                                    event.target.value as MastConfigName,
                                )
                            }>
                            {mastConfigs.map((config, cIndex) => (
                                <option key={cIndex} value={config.name}>
                                    {config.name}
                                </option>
                            ))}
                        </select>
                    </InputLabel>
                </div>
            ))}
        </DialogWindow>
    );
};
