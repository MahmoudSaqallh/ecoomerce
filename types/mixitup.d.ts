declare module "mixitup" {
  type MixitupConfig = {
    animation?: {
      duration?: number;
    };
  };

  type MixitupInstance = unknown;

  function mixitup(
    container: Element,
    config?: MixitupConfig
  ): MixitupInstance;

  export default mixitup;
}
