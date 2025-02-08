import type { AnyColorMode } from "~/types/color";
import { convertRgb, getBrightness, getLuminance, getContrast } from "~/utils";

interface Props {
  color: AnyColorMode;
}

export default function ColorContrast({ color }: Props) {
  const currentColor = convertRgb(color);

  const brightness = getBrightness(currentColor);
  const luminance = getLuminance(currentColor);
  const contrast = getContrast({ r: 255, g: 255, b: 255 }, currentColor);

  const { ratio, normal, large } = contrast;
  const [normalAA, normalAAA] = normal;
  const [largeAA, largeAAA] = large;

  return (
    <div role="none" className="grid gap-y-2 text-gray-800 dark:text-gray-200">
      <p>{`Brightness: ${brightness}`}</p>
      <p>{`Luminance: ${luminance}`}</p>
      <p>{`Contrast: ${ratio}`}</p>
      <ol className="grid gap-y-2">
        <li className="inline-grid">
          <p>WCAG Normal</p>
          <ol>
            <li>{`AA: ${normalAA}`}</li>
            <li>{`AAA: ${normalAAA}`}</li>
          </ol>
        </li>
        <li className="inline-grid">
          <p>WCAG Large</p>
          <ol>
            <li>{`AA: ${largeAA}`}</li>
            <li>{`AAA: ${largeAAA}`}</li>
          </ol>
        </li>
      </ol>
    </div>
  );
}
