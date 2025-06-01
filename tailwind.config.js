module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--primary))",
        "primary-mid": "hsl(var(--primary-mid))",
        secondary: "hsl(var(--secondary))",
        "secondary-mid": "hsl(var(--secondary-mid))",
        gray: "hsl(var(--gray))",
        dark: "hsl(var(--dark))",
        darker: "hsl(var(--darker))",
        darkest: "hsl(var(--darkest))",
        white: "hsl(var(--white))",

        "other-gold": "hsl(var(--other-gold))",
        "other-red": "hsl(var(--other-red))",
        "other-green": "hsl(var(--other-green))",
      },
      borderRadius: {
        xl: "var(--radius)",
        lg: "var(--radius)",
        md: "var(--radius)",
        sm: "var(--radius-sm)",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "spin-reverse": "spin 3s linear infinite reverse",
      },
      fontFamily: {
        inter: ["Inter"],
        mono: ['"Ubuntu Sans Mono"'],
      },
    },
  },
};
