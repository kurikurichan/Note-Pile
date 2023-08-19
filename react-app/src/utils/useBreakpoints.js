import useWindowDimensions from "./mediaQueries";

// Define the breakpoint for mobile resolutions
// const MOBILE = "(max-width: 480px)";
// const TABLET = "(max-width: 768px)";
// const DESKTOP = "(max-width: 1024px)";
// const XL = "(max-width: 1440px)";

// const MOBILE = width && width < 480;
// const TABLET = width && width < 768;
// const DESKTOP = width && width < 1024;

export default function useBreakpoints() {
  const { width, height } = useWindowDimensions();
  console.log(width, height);
  return {
    isMobile: width && width < 480,
    isTablet: width && width < 768,
    isDesktop: width && width < 1024,
  };
}
