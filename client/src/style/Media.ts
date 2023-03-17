import { css, CSSObject, SimpleInterpolation } from "styled-components";

type DeviceType = "pc" | "mobile";

const sizes: Record<DeviceType, number> = {
  pc: 1400,
  mobile: 700,
};

const media = Object.entries(sizes).reduce((acc, [key, value]) => {
  return {
    ...acc,
    [key]: (
      first: CSSObject | TemplateStringsArray,
      ...interpolations: SimpleInterpolation[]
    ) => css`
      @media (max-width: ${value}px) {
        ${css(first, ...interpolations)}
      }
    `,
  };
}, {}) as Record<DeviceType, any>;

export { media };
