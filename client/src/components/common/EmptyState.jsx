import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import Heading from "./Heading";

const EmptyState = ({
  title,
  icon,
  subtitle,
  desc,
  titleClass,
  subtitleClass,
  descClass,
  children,
}) => {
  return (
    <section className="flex flex-col items-center justify-center h-full p-4">
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {icon && { icon }}
      </motion.div>

      <Heading
        title={title}
        subtitle={subtitle}
        subtitleClass={twMerge("mb-2", subtitleClass)}
        titleClass={twMerge("mb-2", titleClass)}
      />

      {desc && (
        <p
          className={twMerge(
            "text-base text-center text-gray-500 mb-6",
            descClass
          )}
        >
          {desc}
        </p>
      )}
      {children}
    </section>
  );
};

export default EmptyState;
