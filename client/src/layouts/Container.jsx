import usePageInfo from "../hooks/usePageInfo";

const Container = ({ children }) => {
  const { isSinglePropertyPage, isMessagesPage } = usePageInfo();

  let paddingClasses = "px-4 md:px-[40px] xl:px-[80px]";

  if (isSinglePropertyPage) {
    paddingClasses = "px-4 md:px-[40px] xl:px-[160px]";
  } else if (isMessagesPage) {
    paddingClasses = "px-4 md:px-[40px] xl:px-[40px] 2xl:px-[80px]";
  }

  return (
    <div
      role="region"
      aria-label="Content Container"
      className={`
        mx-auto
        w-full
        h-full
        max-w-[1600px]
        ${paddingClasses}
      `}
    >
      {children}
    </div>
  );
};

export default Container;
