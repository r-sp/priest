import { type Metadata } from "next";
import ColorPicker from "~/components/ui/color-picker";

export const metadata: Metadata = {
  title: "Color Picker",
};

export default function ColorPickerPage() {
  return <ColorPicker />;
}
