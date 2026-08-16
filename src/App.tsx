import { useCallback, useState } from 'react';
import { Header } from './components/Header/Header';
import { MainApp } from './components/MainApp/MainApp';
import { TeamsDrawer } from './components/TeamsDrawer/TeamsDrawer';
import { AppStoreProvider } from './state/AppStoreProvider';

export const App = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const openDrawer = useCallback(() => setIsDrawerOpen(true), []);

    return (
        <AppStoreProvider>
            <div className="flex min-h-dvh flex-col bg-background text-foreground">
                <Header onOpenDrawer={openDrawer} />
                <TeamsDrawer isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
                <MainApp onOpenDrawer={openDrawer} />
            </div>
        </AppStoreProvider>
    );
};
