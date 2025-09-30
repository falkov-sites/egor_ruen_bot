// import { m, LazyMotion, domAnimation } from "framer-motion";

type propsType = {
  url: string;
};

const Component404 = (props: propsType) => {
  return (
    // <LazyMotion features={domAnimation}>
    <div>
      {/* <m.div
          className="m-2 flex flex-col items-center justify-center p-6 text-3xl [text-shadow:4px_4px_4px_rgb(150,150,150)]"
          animate={{ scale: 1.1 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        > */}
      <p>страница по адресу:</p>
      <p>'{props.url}'</p>
      <p>еще в разработке</p>
      {/* </m.div> */}
    </div>
    // </LazyMotion>
  );
};

export { Component404 };
