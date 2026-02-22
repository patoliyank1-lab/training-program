// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)', // Start 10px above final position
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)', // End at final position
          },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out forwards', // Apply the keyframes with duration, easing, and fill-mode
      },
    },
  },
  plugins: [],
};
