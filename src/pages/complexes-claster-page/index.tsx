import { TabsMenu, type Tabs } from '@components/tabs-menu';
import { HolyGrailLayout } from '@pages/holy-grail-layout';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

export const ComplexsClasterPage = () => {
    const tabs = {
        complexes: {
            title: 'Комплексы',
            link: '',
        },
        'mast-configs': {
            title: 'Конфиги мачт',
            link: 'mast-configs',
        },
        measures: {
            title: 'Параметры',
            link: 'measures',
        },
    } satisfies Tabs;

    const [currentTab, setCurrentTab] = useState<keyof typeof tabs>('complexes');

    return (
        <HolyGrailLayout>
            <TabsMenu current={currentTab} tabs={tabs} onChange={setCurrentTab} />
            <Outlet />
        </HolyGrailLayout>
    );
};
