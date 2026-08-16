import { Menu, Moon, Sun } from 'lucide-react';
import { Button } from '@heroui/react';
import { useTheme } from 'next-themes';
import { memo, useEffect, useState } from 'react';

export type HeaderProps = {
    onOpenDrawer: VoidFunction;
};

export const Header = memo(({ onOpenDrawer }: HeaderProps) => {
    const { resolvedTheme, setTheme } = useTheme();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const isDark = resolvedTheme !== 'light';

    return (
        <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
            <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-2 px-3 sm:px-4">
                <Button
                    isIconOnly
                    variant="ghost"
                    onPress={onOpenDrawer}
                    aria-label="Open participants menu"
                >
                    <Menu className="size-5" />
                </Button>
                <h1 className="truncate text-center text-base font-semibold tracking-tight">
                    Triage Wheel of Misfortune
                </h1>
                <Button
                    isIconOnly
                    variant="ghost"
                    onPress={() => setTheme(isDark ? 'light' : 'dark')}
                    aria-label="Toggle theme"
                >
                    {isMounted ? (
                        isDark ? (
                            <Sun className="size-5" />
                        ) : (
                            <Moon className="size-5" />
                        )
                    ) : (
                        <span className="size-5" />
                    )}
                </Button>
            </div>
        </header>
    );
});

Header.displayName = 'Header';
