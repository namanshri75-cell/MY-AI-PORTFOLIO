export type LandingPageCustomization = {
  fontFamily?: string;
  colors?: Record<string, string>;
  css?: string;
  [key: string]: any;
};

export function applyPageCustomization(
  frame: HTMLIFrameElement | null,
  customization?: LandingPageCustomization,
) {
  if (!frame || !customization) return;
  try {
    const document = frame.contentDocument;
    if (!document) return;
    if (customization.css) {
      let style = document.getElementById("threeui-customization-style");
      if (!style) {
        style = document.createElement("style");
        style.id = "threeui-customization-style";
        document.head.appendChild(style);
      }
      style.textContent = customization.css;
    }
  } catch {}
}

export function postPageCustomization(
  frame: HTMLIFrameElement | null,
  customization?: LandingPageCustomization,
) {
  if (!frame || !customization) return;
  try {
    frame.contentWindow?.postMessage(
      { type: "threeui-customization", customization },
      "*"
    );
  } catch {}
}

export type PageTypographyProps = {
  customization?: LandingPageCustomization;
  [key: string]: any;
};

export function splitTypographyProps<T extends Record<string, any>>(
  props: T
): [PageTypographyProps, Omit<T, keyof PageTypographyProps>] {
  const { customization, ...rest } = props;
  return [{ customization }, rest as any];
}

export function usePageTypography(recipe: any, type: PageTypographyProps) {
  return type?.customization;
}
