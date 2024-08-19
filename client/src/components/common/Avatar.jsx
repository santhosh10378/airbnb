import { twMerge } from "tailwind-merge";
import { AvatarIcon } from "../../assets";

const Avatar = ({ src, alt = "user image", className }) => {
  return (
    <>
      {src ? (
        <img
          src={src}
          alt={alt}
          className={twMerge("rounded-full size-7 object-cover", className)}
        />
      ) : (
        <AvatarIcon
          className={twMerge("size-6 text-secondary-600", className)}
        />
      )}
    </>
  );
};

export default Avatar;
