import useWindowDimensions from "./mediaQueries";

// Define the breakpoint for mobile resolutions

export default function useBreakpoints() {
  const { width, height } = useWindowDimensions();
  console.log(width, height);
  return {
    isMobile: width && width < 480,
    isTablet: width && width < 768,
    isDesktop: width && width < 1024,
  };
}
