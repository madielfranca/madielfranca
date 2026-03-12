tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Outfit', 'sans-serif'],
            },
            colors: {
                brand: {
                    50: '#f0f3ff',
                    100: '#e0e7ff',
                    200: '#c7d2fe',
                    300: '#a5b4fc',
                    400: '#818cf8',
                    500: '#6366f1',
                    600: '#4f46e5', // Cyber Blue
                    700: '#4338ca',
                    800: '#3730a3',
                    900: '#312e81',
                    950: '#1e1b4b',
                },
                accent: {
                    400: '#c084fc',
                    500: '#a855f7', // Electric Violet
                    600: '#9333ea',
                },
                space: {
                    900: '#0B0B14', // Deep Dark Background
                    800: '#131320', // Card Background
                    700: '#1C1C2C', // Border/Hover
                }
            },
            animation: {
                'blob': 'blob 7s infinite',
                'pulse-neon': 'pulse-neon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'grid-movement': 'grid-movement 20s linear infinite',
            },
            keyframes: {
                blob: {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' }
                },
                'pulse-neon': {
                    '0%, 100%': { opacity: 1, boxShadow: '0 0 15px rgba(79, 70, 229, 0.6)' },
                    '50%': { opacity: .7, boxShadow: '0 0 30px rgba(79, 70, 229, 0.9), 0 0 10px rgba(168, 85, 247, 0.6)' }
                },
                'grid-movement': {
                    '0%': { backgroundPosition: '0 0' },
                    '100%': { backgroundPosition: '40px 40px' }
                }
            }
        }
    }
}
