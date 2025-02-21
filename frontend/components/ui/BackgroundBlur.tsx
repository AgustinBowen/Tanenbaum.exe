interface BackgroundBlurProps {
  left?: string;
  top?: string;
  translateX?: string;
  translateY?: string;
}

const BackgroundBlur = ({
  left = "50%", 
  top = "50%",  
  translateX = "-50%",
  translateY = "-50%",
}: BackgroundBlurProps) => {
  return (
    <div
      className={`h-[300px] w-[400px] rounded-full absolute bg-shadows blur-[220px] z-0 transition-all`}
      style={{
        left,
        top,
        transform: `translateX(${translateX}) translateY(${translateY})`,
      }}
    ></div>
  );
};

export default BackgroundBlur;

  