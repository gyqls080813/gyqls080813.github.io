import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type ThemeName = 'warm' | 'ocean' | 'forest' | 'lavender';

export interface ThemeOption {
    name: ThemeName;
    label: string;
    emoji: string;
    preview: string;
}

export const THEMES: ThemeOption[] = [
    { name: 'warm',     label: '웜 브라운', emoji: '🍂', preview: '#9c8568' },
    { name: 'ocean',    label: '오션 블루', emoji: '🌊', preview: '#2980b9' },
    { name: 'forest',   label: '포레스트',  emoji: '🌿', preview: '#27ae60' },
    { name: 'lavender', label: '라벤더',    emoji: '🌸', preview: '#8e44ad' },
];

interface ThemeContextType {
    theme: ThemeName;
    setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'warm',
    setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<ThemeName>('warm');

    useEffect(() => {
        const saved = localStorage.getItem('petfolio-theme') as ThemeName | null;
        if (saved && THEMES.some(t => t.name === saved)) {
            setThemeState(saved);
            applyTheme(saved);
        }
    }, []);

    const applyTheme = (name: ThemeName) => {
        if (name === 'warm') {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', name);
        }
    };

    const setTheme = useCallback((name: ThemeName) => {
        setThemeState(name);
        applyTheme(name);
        localStorage.setItem('petfolio-theme', name);
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
