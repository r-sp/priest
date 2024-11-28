import { type Metadata } from "next";
import { type ColorShadeName, getColorName, getColorShade } from "~/lib/color";
import ColorShade from "~/components/ui/color-shade";

export const dynamicParams = false;

export async function generateStaticParams(): Promise<{ shade: ColorShadeName }[]> {
  return [
    { shade: "black" },
    { shade: "gray" },
    { shade: "white" },
    { shade: "red" },
    { shade: "orange" },
    { shade: "yellow" },
    { shade: "green" },
    { shade: "cyan" },
    { shade: "blue" },
    { shade: "violet" },
    { shade: "purple" },
    { shade: "magenta" },
    { shade: "pink" },
    { shade: "brown" },
  ];
}

export async function generateMetadata({ params }: { params: { shade: ColorShadeName } }): Promise<Metadata> {
  const { shade } = await params;
  const pageTitle = getColorName(shade);

  return {
    title: pageTitle,
    description: "The Holy Colors",
  };
}

export default async function ColorShadePage({ params }: { params: { shade: ColorShadeName } }) {
  const { shade } = await params;

  const colorName = getColorName(shade);
  const colorList = getColorShade(shade);

  return (
    <div className="grid gap-4 py-6" role="none">
      <h1 className="text-3xl font-semibold text-holy-100">{colorName}</h1>
      <ColorShade color={colorList} />
    </div>
  );
}
