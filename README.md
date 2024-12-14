# Priest: The Holy Colors

## Color Space

### `rgb`

| Channel | Range    | CSS        | Description |
| ------- | -------- | ---------- | ----------- |
| `r`     | `[0, 1]` | `[0, 255]` | Red         |
| `g`     | `[0, 1]` | `[0, 255]` | Green       |
| `b`     | `[0, 1]` | `[0, 255]` | Blue        |

### `hsl`

| Channel | Range      | CSS        | Description |
| ------- | ---------- | ---------- | ----------- |
| `h`     | `[0, 360]` | `[0, 360]` | Hue         |
| `s`     | `[0, 1]`   | `[0, 100]` | Saturation  |
| `l`     | `[0, 1]`   | `[0, 100]` | Lightness   |

### `hwb`

| Channel | Range      | CSS        | Description |
| ------- | ---------- | ---------- | ----------- |
| `h`     | `[0, 360]` | `[0, 360]` | Hue         |
| `w`     | `[0, 1]`   | `[0, 100]` | Whiteness   |
| `b`     | `[0, 1]`   | `[0, 100]` | Blacknees   |

### `lab`

| Channel | Range / CSS   | Description |
| ------- | ------------- | ----------- |
| `l`     | `[0, 100]`    | Lightness   |
| `a`     | `[-100, 100]` | Red-Green   |
| `b`     | `[-100, 100]` | Blue-Yellow |

### `lch`

| Channel | Range / CSS | Description |
| ------- | ----------- | ----------- |
| `l`     | `[0, 100]`  | Lightness   |
| `c`     | `[0, 150]`  | Chroma      |
| `h`     | `[0, 360]`  | Hue         |

### `oklab`

| Channel | Range / CSS   | Description |
| ------- | ------------- | ----------- |
| `l`     | `[0, 1]`      | Lightness   |
| `a`     | `[-0.4, 0.4]` | Red-Green   |
| `b`     | `[-0.4, 0.4]` | Blue-Yellow |

### `oklch`

| Channel | Range / CSS | Description |
| ------- | ----------- | ----------- |
| `l`     | `[0, 1]`    | Lightness   |
| `c`     | `[0, 0.4]`  | Chroma      |
| `h`     | `[0, 360]`  | Hue         |

Read more about [Built-in Color Space with Culori](https://culorijs.org/color-spaces/).

## Local dev

Run `pnpm install` and `pnpm run dev` to start developing.
