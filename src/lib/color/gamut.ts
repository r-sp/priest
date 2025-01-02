import type { ColorShadeVariant, ColorNameVariant } from "../types";

// prettier-ignore
function shader(type: ColorShadeVariant, color: { [T in ColorShadeVariant]: number; }): number {
  switch (type) {
    case "50": return color[50]; break;
    case "100": return color[100]; break;
    case "200": return color[200]; break;
    case "300": return color[300]; break;
    case "400": return color[400]; break;
    case "500": return color[500]; break;
    case "600": return color[600]; break;
    case "700": return color[700]; break;
    case "800": return color[800]; break;
    case "900": return color[900]; break;
    case "950": return color[950]; break;
  }
}

function applyGamut(
  hue: number,
  color: { [T in ColorNameVariant]: number },
): number {
  const red = 17.38;
  const orange = 36.259;
  const amber = 45.635;
  const yellow = 53.813;
  const lime = 120.757;
  const green = 149.214;
  const emerald = 162.48;
  const teal = 180.426;
  const cyan = 200.873;
  const sky = 211.53;
  const blue = 232.661;
  const indigo = 254.624;
  const violet = 276.935;
  const purple = 293.541;
  const fuchsia = 305.504;
  const pink = 322.16;
  const rose = 349.761;

  const between = (min: number, max: number): boolean => {
    return hue === min || (hue > min && hue < max);
  };

  const betweenMax = (min: number, max: number): boolean => {
    return hue === min || hue > min || hue < max;
  };

  if (between(red, orange)) {
    return color.red;
  } else if (between(orange, amber)) {
    return color.orange;
  } else if (between(amber, yellow)) {
    return color.amber;
  } else if (between(yellow, lime)) {
    return color.yellow;
  } else if (between(lime, green)) {
    return color.lime;
  } else if (between(green, emerald)) {
    return color.green;
  } else if (between(emerald, teal)) {
    return color.emerald;
  } else if (between(teal, cyan)) {
    return color.teal;
  } else if (between(cyan, sky)) {
    return color.cyan;
  } else if (between(sky, blue)) {
    return color.sky;
  } else if (between(blue, indigo)) {
    return color.blue;
  } else if (between(indigo, violet)) {
    return color.indigo;
  } else if (between(violet, purple)) {
    return color.violet;
  } else if (between(purple, fuchsia)) {
    return color.purple;
  } else if (between(fuchsia, pink)) {
    return color.fuchsia;
  } else if (between(pink, rose)) {
    return color.pink;
  } else if (betweenMax(rose, red)) {
    return color.red;
  } else {
    return 0;
  }
}

export function gamutLightness(
  lightness: number,
  hue: number,
  type: ColorShadeVariant,
): number {
  const limitGamut = (max: number): number => {
    return Math.max(max / 2, Math.min(lightness, max));
  };

  return applyGamut(hue, {
    red: shader(type, {
      50: limitGamut(0.971),
      100: limitGamut(0.936),
      200: limitGamut(0.885),
      300: limitGamut(0.808),
      400: limitGamut(0.704),
      500: limitGamut(0.637),
      600: limitGamut(0.577),
      700: limitGamut(0.505),
      800: limitGamut(0.444),
      900: limitGamut(0.396),
      950: limitGamut(0.258),
    }),
    orange: shader(type, {
      50: limitGamut(0.98),
      100: limitGamut(0.954),
      200: limitGamut(0.901),
      300: limitGamut(0.837),
      400: limitGamut(0.75),
      500: limitGamut(0.705),
      600: limitGamut(0.646),
      700: limitGamut(0.553),
      800: limitGamut(0.47),
      900: limitGamut(0.408),
      950: limitGamut(0.266),
    }),
    amber: shader(type, {
      50: limitGamut(0.987),
      100: limitGamut(0.962),
      200: limitGamut(0.924),
      300: limitGamut(0.879),
      400: limitGamut(0.828),
      500: limitGamut(0.769),
      600: limitGamut(0.666),
      700: limitGamut(0.555),
      800: limitGamut(0.473),
      900: limitGamut(0.414),
      950: limitGamut(0.279),
    }),
    yellow: shader(type, {
      50: limitGamut(0.987),
      100: limitGamut(0.973),
      200: limitGamut(0.945),
      300: limitGamut(0.905),
      400: limitGamut(0.852),
      500: limitGamut(0.795),
      600: limitGamut(0.681),
      700: limitGamut(0.554),
      800: limitGamut(0.476),
      900: limitGamut(0.421),
      950: limitGamut(0.286),
    }),
    lime: shader(type, {
      50: limitGamut(0.986),
      100: limitGamut(0.967),
      200: limitGamut(0.938),
      300: limitGamut(0.897),
      400: limitGamut(0.841),
      500: limitGamut(0.768),
      600: limitGamut(0.648),
      700: limitGamut(0.532),
      800: limitGamut(0.453),
      900: limitGamut(0.405),
      950: limitGamut(0.274),
    }),
    green: shader(type, {
      50: limitGamut(0.982),
      100: limitGamut(0.962),
      200: limitGamut(0.925),
      300: limitGamut(0.871),
      400: limitGamut(0.792),
      500: limitGamut(0.723),
      600: limitGamut(0.627),
      700: limitGamut(0.527),
      800: limitGamut(0.448),
      900: limitGamut(0.393),
      950: limitGamut(0.266),
    }),
    emerald: shader(type, {
      50: limitGamut(0.979),
      100: limitGamut(0.95),
      200: limitGamut(0.905),
      300: limitGamut(0.845),
      400: limitGamut(0.765),
      500: limitGamut(0.696),
      600: limitGamut(0.596),
      700: limitGamut(0.508),
      800: limitGamut(0.432),
      900: limitGamut(0.378),
      950: limitGamut(0.262),
    }),
    teal: shader(type, {
      50: limitGamut(0.984),
      100: limitGamut(0.953),
      200: limitGamut(0.91),
      300: limitGamut(0.855),
      400: limitGamut(0.777),
      500: limitGamut(0.704),
      600: limitGamut(0.6),
      700: limitGamut(0.511),
      800: limitGamut(0.437),
      900: limitGamut(0.386),
      950: limitGamut(0.277),
    }),
    cyan: shader(type, {
      50: limitGamut(0.984),
      100: limitGamut(0.956),
      200: limitGamut(0.917),
      300: limitGamut(0.865),
      400: limitGamut(0.789),
      500: limitGamut(0.715),
      600: limitGamut(0.609),
      700: limitGamut(0.52),
      800: limitGamut(0.45),
      900: limitGamut(0.398),
      950: limitGamut(0.302),
    }),
    sky: shader(type, {
      50: limitGamut(0.977),
      100: limitGamut(0.951),
      200: limitGamut(0.901),
      300: limitGamut(0.828),
      400: limitGamut(0.746),
      500: limitGamut(0.685),
      600: limitGamut(0.588),
      700: limitGamut(0.5),
      800: limitGamut(0.443),
      900: limitGamut(0.391),
      950: limitGamut(0.293),
    }),
    blue: shader(type, {
      50: limitGamut(0.97),
      100: limitGamut(0.932),
      200: limitGamut(0.882),
      300: limitGamut(0.809),
      400: limitGamut(0.707),
      500: limitGamut(0.623),
      600: limitGamut(0.546),
      700: limitGamut(0.488),
      800: limitGamut(0.424),
      900: limitGamut(0.379),
      950: limitGamut(0.282),
    }),
    indigo: shader(type, {
      50: limitGamut(0.962),
      100: limitGamut(0.93),
      200: limitGamut(0.87),
      300: limitGamut(0.785),
      400: limitGamut(0.673),
      500: limitGamut(0.585),
      600: limitGamut(0.511),
      700: limitGamut(0.457),
      800: limitGamut(0.398),
      900: limitGamut(0.359),
      950: limitGamut(0.257),
    }),
    violet: shader(type, {
      50: limitGamut(0.969),
      100: limitGamut(0.943),
      200: limitGamut(0.894),
      300: limitGamut(0.811),
      400: limitGamut(0.702),
      500: limitGamut(0.606),
      600: limitGamut(0.541),
      700: limitGamut(0.491),
      800: limitGamut(0.432),
      900: limitGamut(0.38),
      950: limitGamut(0.283),
    }),
    purple: shader(type, {
      50: limitGamut(0.977),
      100: limitGamut(0.946),
      200: limitGamut(0.902),
      300: limitGamut(0.827),
      400: limitGamut(0.714),
      500: limitGamut(0.627),
      600: limitGamut(0.558),
      700: limitGamut(0.496),
      800: limitGamut(0.438),
      900: limitGamut(0.381),
      950: limitGamut(0.291),
    }),
    fuchsia: shader(type, {
      50: limitGamut(0.977),
      100: limitGamut(0.952),
      200: limitGamut(0.903),
      300: limitGamut(0.833),
      400: limitGamut(0.74),
      500: limitGamut(0.667),
      600: limitGamut(0.591),
      700: limitGamut(0.518),
      800: limitGamut(0.452),
      900: limitGamut(0.401),
      950: limitGamut(0.293),
    }),
    pink: shader(type, {
      50: limitGamut(0.971),
      100: limitGamut(0.948),
      200: limitGamut(0.899),
      300: limitGamut(0.823),
      400: limitGamut(0.718),
      500: limitGamut(0.656),
      600: limitGamut(0.592),
      700: limitGamut(0.525),
      800: limitGamut(0.459),
      900: limitGamut(0.408),
      950: limitGamut(0.284),
    }),
    rose: shader(type, {
      50: limitGamut(0.969),
      100: limitGamut(0.941),
      200: limitGamut(0.892),
      300: limitGamut(0.81),
      400: limitGamut(0.712),
      500: limitGamut(0.645),
      600: limitGamut(0.586),
      700: limitGamut(0.514),
      800: limitGamut(0.455),
      900: limitGamut(0.41),
      950: limitGamut(0.271),
    }),
  });
}

export function gamutChroma(
  chroma: number,
  hue: number,
  type: ColorShadeVariant,
): number {
  const limitGamut = (max: number): number => {
    return Math.max(max / 2, Math.min(chroma, max));
  };

  return applyGamut(hue, {
    red: shader(type, {
      50: limitGamut(0.013),
      100: limitGamut(0.032),
      200: limitGamut(0.062),
      300: limitGamut(0.114),
      400: limitGamut(0.191),
      500: limitGamut(0.237),
      600: limitGamut(0.245),
      700: limitGamut(0.213),
      800: limitGamut(0.177),
      900: limitGamut(0.141),
      950: limitGamut(0.092),
    }),
    orange: shader(type, {
      50: limitGamut(0.016),
      100: limitGamut(0.038),
      200: limitGamut(0.076),
      300: limitGamut(0.128),
      400: limitGamut(0.183),
      500: limitGamut(0.213),
      600: limitGamut(0.222),
      700: limitGamut(0.195),
      800: limitGamut(0.157),
      900: limitGamut(0.123),
      950: limitGamut(0.079),
    }),
    amber: shader(type, {
      50: limitGamut(0.022),
      100: limitGamut(0.059),
      200: limitGamut(0.12),
      300: limitGamut(0.169),
      400: limitGamut(0.189),
      500: limitGamut(0.188),
      600: limitGamut(0.179),
      700: limitGamut(0.163),
      800: limitGamut(0.137),
      900: limitGamut(0.112),
      950: limitGamut(0.077),
    }),
    yellow: shader(type, {
      50: limitGamut(0.026),
      100: limitGamut(0.071),
      200: limitGamut(0.129),
      300: limitGamut(0.182),
      400: limitGamut(0.199),
      500: limitGamut(0.184),
      600: limitGamut(0.162),
      700: limitGamut(0.135),
      800: limitGamut(0.114),
      900: limitGamut(0.095),
      950: limitGamut(0.066),
    }),
    lime: shader(type, {
      50: limitGamut(0.031),
      100: limitGamut(0.067),
      200: limitGamut(0.127),
      300: limitGamut(0.196),
      400: limitGamut(0.238),
      500: limitGamut(0.233),
      600: limitGamut(0.2),
      700: limitGamut(0.157),
      800: limitGamut(0.124),
      900: limitGamut(0.101),
      950: limitGamut(0.072),
    }),
    green: shader(type, {
      50: limitGamut(0.018),
      100: limitGamut(0.044),
      200: limitGamut(0.084),
      300: limitGamut(0.15),
      400: limitGamut(0.209),
      500: limitGamut(0.219),
      600: limitGamut(0.194),
      700: limitGamut(0.154),
      800: limitGamut(0.119),
      900: limitGamut(0.095),
      950: limitGamut(0.065),
    }),
    emerald: shader(type, {
      50: limitGamut(0.021),
      100: limitGamut(0.052),
      200: limitGamut(0.093),
      300: limitGamut(0.143),
      400: limitGamut(0.177),
      500: limitGamut(0.17),
      600: limitGamut(0.145),
      700: limitGamut(0.118),
      800: limitGamut(0.095),
      900: limitGamut(0.077),
      950: limitGamut(0.051),
    }),
    teal: shader(type, {
      50: limitGamut(0.014),
      100: limitGamut(0.051),
      200: limitGamut(0.096),
      300: limitGamut(0.138),
      400: limitGamut(0.152),
      500: limitGamut(0.14),
      600: limitGamut(0.118),
      700: limitGamut(0.096),
      800: limitGamut(0.078),
      900: limitGamut(0.063),
      950: limitGamut(0.046),
    }),
    cyan: shader(type, {
      50: limitGamut(0.019),
      100: limitGamut(0.045),
      200: limitGamut(0.08),
      300: limitGamut(0.127),
      400: limitGamut(0.154),
      500: limitGamut(0.143),
      600: limitGamut(0.126),
      700: limitGamut(0.105),
      800: limitGamut(0.085),
      900: limitGamut(0.07),
      950: limitGamut(0.056),
    }),
    sky: shader(type, {
      50: limitGamut(0.013),
      100: limitGamut(0.026),
      200: limitGamut(0.058),
      300: limitGamut(0.111),
      400: limitGamut(0.16),
      500: limitGamut(0.169),
      600: limitGamut(0.158),
      700: limitGamut(0.134),
      800: limitGamut(0.11),
      900: limitGamut(0.09),
      950: limitGamut(0.066),
    }),
    blue: shader(type, {
      50: limitGamut(0.014),
      100: limitGamut(0.032),
      200: limitGamut(0.059),
      300: limitGamut(0.105),
      400: limitGamut(0.165),
      500: limitGamut(0.214),
      600: limitGamut(0.245),
      700: limitGamut(0.243),
      800: limitGamut(0.199),
      900: limitGamut(0.146),
      950: limitGamut(0.091),
    }),
    indigo: shader(type, {
      50: limitGamut(0.018),
      100: limitGamut(0.034),
      200: limitGamut(0.065),
      300: limitGamut(0.115),
      400: limitGamut(0.182),
      500: limitGamut(0.233),
      600: limitGamut(0.262),
      700: limitGamut(0.24),
      800: limitGamut(0.195),
      900: limitGamut(0.144),
      950: limitGamut(0.09),
    }),
    violet: shader(type, {
      50: limitGamut(0.016),
      100: limitGamut(0.029),
      200: limitGamut(0.057),
      300: limitGamut(0.111),
      400: limitGamut(0.183),
      500: limitGamut(0.25),
      600: limitGamut(0.281),
      700: limitGamut(0.27),
      800: limitGamut(0.232),
      900: limitGamut(0.189),
      950: limitGamut(0.141),
    }),
    purple: shader(type, {
      50: limitGamut(0.014),
      100: limitGamut(0.033),
      200: limitGamut(0.063),
      300: limitGamut(0.119),
      400: limitGamut(0.203),
      500: limitGamut(0.265),
      600: limitGamut(0.288),
      700: limitGamut(0.265),
      800: limitGamut(0.218),
      900: limitGamut(0.176),
      950: limitGamut(0.149),
    }),
    fuchsia: shader(type, {
      50: limitGamut(0.017),
      100: limitGamut(0.037),
      200: limitGamut(0.076),
      300: limitGamut(0.145),
      400: limitGamut(0.238),
      500: limitGamut(0.295),
      600: limitGamut(0.293),
      700: limitGamut(0.253),
      800: limitGamut(0.211),
      900: limitGamut(0.17),
      950: limitGamut(0.136),
    }),
    pink: shader(type, {
      50: limitGamut(0.014),
      100: limitGamut(0.028),
      200: limitGamut(0.061),
      300: limitGamut(0.12),
      400: limitGamut(0.202),
      500: limitGamut(0.241),
      600: limitGamut(0.249),
      700: limitGamut(0.223),
      800: limitGamut(0.187),
      900: limitGamut(0.153),
      950: limitGamut(0.109),
    }),
    rose: shader(type, {
      50: limitGamut(0.015),
      100: limitGamut(0.03),
      200: limitGamut(0.058),
      300: limitGamut(0.117),
      400: limitGamut(0.194),
      500: limitGamut(0.246),
      600: limitGamut(0.253),
      700: limitGamut(0.222),
      800: limitGamut(0.188),
      900: limitGamut(0.159),
      950: limitGamut(0.105),
    }),
  });
}
