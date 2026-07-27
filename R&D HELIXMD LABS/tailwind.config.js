/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
	  "./src/**/*.{js,jsx,ts,tsx}",
	  "./public/index.html"
	],
	theme: {
	  extend: {
		// --- ADDED FONT FAMILIES HERE ---
		fontFamily: {
			space: ['"Space Grotesk"', 'sans-serif'],   // for your hero
			questrial: ['"Questrial"', 'sans-serif'],
			sans: ['"Inter"', 'sans-serif'],
			mono: ['"Space Mono"', 'monospace'],
		  },
		// --------------------------------
		borderRadius: {
		  lg: 'var(--radius)',
		  md: 'calc(var(--radius) - 2px)',
		  sm: 'calc(var(--radius) - 4px)'
		},
		colors: {
		  // HelixMD Labs brand palette — sampled from the carton artwork.
		  // Tailwind v4 reads these from the @theme block in src/index.css;
		  // mirrored here so tooling that still parses this file agrees.
		  navy: {
			DEFAULT: '#16305c',
			500: '#2c5296',
			600: '#1e3e72',
			800: '#0f2246',
			900: '#0a1830'
		  },
		  body: {
			DEFAULT: '#5a6b87',
			soft: '#7c8aa3'
		  },
		  brand: {
			cyan: '#17a8e0',
			'cyan-deep': '#0e8cc4',
			teal: '#1fbfae'
		  },
		  ice: {
			DEFAULT: '#f7fafd',
			100: '#eff5fa',
			200: '#e2ecf5'
		  },
		  line: '#d8e4ef',
		  background: 'hsl(var(--background))',
		  foreground: 'hsl(var(--foreground))',
		  card: {
			DEFAULT: 'hsl(var(--card))',
			foreground: 'hsl(var(--card-foreground))'
		  },
		  popover: {
			DEFAULT: 'hsl(var(--popover))',
			foreground: 'hsl(var(--popover-foreground))'
		  },
		  primary: {
			DEFAULT: 'hsl(var(--primary))',
			foreground: 'hsl(var(--primary-foreground))'
		  },
		  secondary: {
			DEFAULT: 'hsl(var(--secondary))',
			foreground: 'hsl(var(--secondary-foreground))'
		  },
		  muted: {
			DEFAULT: 'hsl(var(--muted))',
			foreground: 'hsl(var(--muted-foreground))'
		  },
		  accent: {
			DEFAULT: 'hsl(var(--accent))',
			foreground: 'hsl(var(--accent-foreground))'
		  },
		  destructive: {
			DEFAULT: 'hsl(var(--destructive))',
			foreground: 'hsl(var(--destructive-foreground))'
		  },
		  border: 'hsl(var(--border))',
		  input: 'hsl(var(--input))',
		  ring: 'hsl(var(--ring))',
		  chart: {
			'1': 'hsl(var(--chart-1))',
			'2': 'hsl(var(--chart-2))',
			'3': 'hsl(var(--chart-3))',
			'4': 'hsl(var(--chart-4))',
			'5': 'hsl(var(--chart-5))'
		  }
		},
		keyframes: {
		  'accordion-down': {
			from: {
			  height: '0'
			},
			to: {
			  height: 'var(--radix-accordion-content-height)'
			}
		  },
		  'accordion-up': {
			from: {
			  height: 'var(--radix-accordion-content-height)'
			},
			to: {
			  height: '0'
			}
		  }
		},
		animation: {
		  'accordion-down': 'accordion-down 0.2s ease-out',
		  'accordion-up': 'accordion-up 0.2s ease-out'
		}
	  }
	},
	plugins: [require("tailwindcss-animate")],
  };