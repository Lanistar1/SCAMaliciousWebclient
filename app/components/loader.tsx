import Image from "next/image";

const Loader = () => (
  <div className="inline-flex justify-center items-center">
    <Image
      src="/assets/icons/loader.svg"
      alt="loader"
      width={18} height={18}
      className="animate-spin"
    />
  </div>
);

export default Loader;
