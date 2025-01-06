export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const hexify = (denote: number): string => {
  const hex = denote.toString(16).padStart(6, "0");
  return `#${hex}`;
};
