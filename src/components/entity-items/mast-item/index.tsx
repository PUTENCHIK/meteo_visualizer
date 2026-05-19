import type { ComplexWithCreatorSchema, MastSchema } from '@utils/schemas';
import { ComponentRowBox } from '@components/component-row-box';
import { EntityLabel } from '@components/entity-label';
import { IconButton } from '@components/icon-button';
import { TimestampLabel } from '@components/timestamp-label';
import { useDialogs } from '@context/dialog-context';
import { useDeleteMast } from '@hooks/masts/use-delete-mast';
import { BaseEntityItem } from '@entity-items/base-entity-item';
import { HasPermission } from '@pages/has-permission';
import { useFocus } from '@hooks/use-focus';
import type { MastData } from '@stores/devices-store';
import { useState } from 'react';
import { WeatherStationItem } from '@entity-items/weather-station-item';
import { GeographicCoords } from '@components/geographic-coords';

interface MastItemProps {
    mast: MastSchema;
    complex: ComplexWithCreatorSchema;
    data?: MastData;
    focusable?: boolean;
}

export const MastItem = ({ mast, complex, data, focusable = false }: MastItemProps) => {
    const { openDialog } = useDialogs();
    const { focusMast } = useFocus();
    const deleteMutation = useDeleteMast();

    const [showData, setShowData] = useState(false);
    const isDeleted = mast.deleted_at !== null;

    const updateMast = () => {
        openDialog('edit-mast', { complex: complex, mastId: mast.id });
    };

    const deleteMast = () => {
        openDialog('confirm-delete', {
            mode: 'hard',
            onSubmit: async () => {
                await deleteMutation.mutateAsync({ id: mast.id });
            },
            extra: {
                entityName: 'Мачта',
                entity: mast,
            },
        });
    };

    return (
        <BaseEntityItem deleted={isDeleted}>
            <ComponentRowBox
                left={[<span>Мачта</span>, <EntityLabel entity={mast} />]}
                right={[
                    focusable && (
                        <IconButton
                            iconName='eye'
                            title='Фокус'
                            iconSize={'small'}
                            onClick={() => focusMast(mast.id)}
                        />
                    ),
                    <HasPermission permission='mast:update'>
                        <IconButton
                            iconName='pencil'
                            title='Редактировать'
                            iconSize={'small'}
                            onClick={updateMast}
                        />
                    </HasPermission>,
                    <HasPermission permission='mast:delete'>
                        <IconButton
                            iconName='bin'
                            title='Удалить'
                            iconSize={'small'}
                            onClick={deleteMast}
                        />
                    </HasPermission>,
                ]}
                size='tiny'
            />
            <ComponentRowBox
                left={[
                    <span>Конфиг:</span>,
                    <EntityLabel entity={mast.config} type='mast-config' linkable />,
                ]}
                size='tiny'
            />
            <ComponentRowBox
                left={[
                    [<span>Относительное расположение:</span>],
                    [
                        <GeographicCoords value={mast.latitude} param='lat' />,
                        <GeographicCoords value={mast.longitude} param='lon' />,
                    ],
                ]}
                size='tiny'
                wrap={false}
            />
            <ComponentRowBox
                left={[<span>Угол поворота: {mast.rotation}°</span>]}
                right={[
                    <TimestampLabel value={mast.created_at} />,
                    <TimestampLabel value={mast.updated_at} />,
                ]}
                size='tiny'
            />
            {data && (
                <>
                    <ComponentRowBox
                        left={[<span>Метеостанции</span>]}
                        right={[
                            <IconButton
                                iconName='checron'
                                title={showData ? 'Свернуть' : 'Развернуть'}
                                iconRotate={showData ? -90 : 90}
                                iconSize={'small'}
                                onClick={() => setShowData((prev) => !prev)}
                            />,
                        ]}
                    />
                    {showData &&
                        Object.values(data).map((station, index) => (
                            <WeatherStationItem
                                key={index}
                                mastId={mast.id}
                                yardHeight={station.height}
                                num={station.num}
                                devices={station.devices}
                            />
                        ))}
                </>
            )}
        </BaseEntityItem>
    );
};
