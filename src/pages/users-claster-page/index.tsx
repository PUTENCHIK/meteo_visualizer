import { TabsMenu, type Tabs } from '@components/tabs-menu';
import { HolyGrailLayout } from '@pages/holy-grail-layout';
import { Outlet } from 'react-router-dom';

export const UsersClasterPage = () => {
    const tabs = {
        users: {
            title: 'Пользователи',
            link: '',
        },
        roles: {
            title: 'Роли',
            link: 'roles',
        },
    } satisfies Tabs;

    return (
        <HolyGrailLayout>
            <TabsMenu tabs={tabs} byLocation />
            <Outlet />
        </HolyGrailLayout>
    );
};
