import React from 'react';

const iconProps = {
    size: 32,
    color: "currentColor",
};

export const LoginIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width={iconProps.size} height={iconProps.size} viewBox="0 0 24 24" fill="none" stroke={iconProps.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
        <polyline points="10 17 15 12 10 7" />
        <line x1="15" y1="12" x2="3" y2="12" />
    </svg>
);

export const DollarSignIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width={iconProps.size} height={iconProps.size} viewBox="0 0 24 24" fill="none" stroke={iconProps.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
);

export const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width={iconProps.size} height={iconProps.size} viewBox="0 0 24 24" fill="none" stroke={iconProps.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

// New Feature Icons
export const CarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width={iconProps.size} height={iconProps.size} viewBox="0 0 24 24" fill="none" stroke={iconProps.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 16.5V15a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1.5M4 11l-2-3h14l-2 3H4zM2 9h12v2H2zM3 19h10M20.5 13H22v3.5a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5V13zM18 19h4"/>
    </svg>
);
export const TrophyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width={iconProps.size} height={iconProps.size} viewBox="0 0 24 24" fill="none" stroke={iconProps.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6m12 5h1.5a2.5 2.5 0 0 0 0-5H18M9 12v spezifischeM9 6h6v6H9zM9 12a5 5 0 0 1 5-5m-5 5a5 5 0 0 0 5 5m0-5a5 5 0 0 1 5 5M5 21h14"/>
    </svg>
);
export const WrenchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width={iconProps.size} height={iconProps.size} viewBox="0 0 24 24" fill="none" stroke={iconProps.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
);
export const BadgeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width={iconProps.size} height={iconProps.size} viewBox="0 0 24 24" fill="none" stroke={iconProps.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        <path d="m9 12 2 2 4-4"/>
    </svg>
);
export const TagIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width={iconProps.size} height={iconProps.size} viewBox="0 0 24 24" fill="none" stroke={iconProps.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
        <line x1="7" y1="7" x2="7.01" y2="7"/>
    </svg>
);
export const SupportIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width={iconProps.size} height={iconProps.size} viewBox="0 0 24 24" fill="none" stroke={iconProps.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.5 12.5a9.5 9.5 0 1 1-19 0 9.5 9.5 0 0 1 19 0z"/>
        <path d="M9.5 10a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0z"/>
        <path d="M10 14v1a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2v-1"/>
        <path d="M9 10s-1-4 3-4 3 4 3 4"/>
    </svg>
);