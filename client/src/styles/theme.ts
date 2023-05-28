/*
--- 01 TYPOGRAPHY SYSTEM

- Font sizes (px)
10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

- Font weights
Default: 400
Medium: 500
Semi-bold: 600
Bold: 700

- Line heights
Default: 1
Small: 1.05
Medium: 1.2
Paragraph default: 1.6
Large: 1.8

- Letter spacing
-0.5px
0.75px

--- 02 COLORS

- Primary: #e67e22
- Tints:
#fdf2e9
#fae5d3
#eb984e

- Shades: 
#cf711f
#45260a

- Accents:
- Greys

#888
#767676 (lightest grey allowed on #fff)
#6f6f6f (lightest grey allowed on #fdf2e9)
#555
#333

--- 05 SHADOWS

0 2.4rem 4.8rem rgba(0, 0, 0, 0.075);

--- 06 BORDER-RADIUS

Default: 9px
Medium: 11px

--- 07 WHITESPACE

- Spacing system (px)
2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128
*/

const colors = {
  //Primary-color
  "B-Primary": "#1c7ed6",
  "B-Tints1": "#4998de",
  "B-Tints2": "#d2e5f7",
  "B-Tints3": "#e8f2fb",
  "B-ShadesLight": "#1971c1",
  "B-ShadesDark": "#0e3f6b",
  //Accent-color
  "G-888": "#888",
  "G-555": "#555",
  "G-333": "#333",
  //Red
  R50: "#FDF4F4",
  R100: "#F9DADA",
  R200: "#F4B6B6",
  R300: "#EE9191",
  R400: "#D14343",
  R500: "#A73636",
  R600: "#7D2828"
};

const fontSize = {
  "10": "10px",
  "12": "12px",
  "14": "14px",
  "16": "16px",
  "18": "18px",
  "20": "20px",
  "24": "24px",
  "30": "30px",
  "36": "36px",
  "44": "44px",
  "52": "52px",
  "62": "62px",
  "74": "74px",
  "86": "86px",
  "98": "98px"
};

const fontWeight = {
  Default: "400",
  Medium: "500",
  "Semi-bold": "600",
  Bold: "700"
};

const borderRadius = {
  Default: "9px",
  Medium: "11px",
  Large: "20px"
};

const lineHeight = {
  Default: 1,
  Small: 1.05,
  Medium: 1.2,
  "Paragraph-default": 1.6,
  Large: 1.8
};

const screen = {
  phone: "544px", // 手機
  tablet: "944px", // 平板
  laptop: "1344px" // 筆電、桌機
};

const theme = {
  screen,
  colors,
  borderRadius,
  primaryPalette: {
    Text: colors["G-555"],
    Backdrop: "rgba(0, 0, 0, 0.75)",
    BoxShadow: "rgba(0, 0, 0, 0.2)"
  },
  lineHeight,
  fontSize,
  fontWeight
};

export default theme;
export type ThemeType = typeof theme;
