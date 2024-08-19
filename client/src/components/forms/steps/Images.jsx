import { useEffect } from "react";
import { Controller } from "react-hook-form";
import Button from "../../elements/Button";
import { CloseIcon } from "../../../assets";

const Images = ({ errors, setValue, control, watch }) => {
  const images = watch("images") || [];

  useEffect(() => {
    const urls = images.map((file) => URL.createObjectURL(file));
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setValue("images", files);
  };

  const handleDelete = (index) => {
    const newFiles = [...images];
    newFiles.splice(index, 1);
    setValue("images", newFiles);
  };

  return (
    <div>
      <Controller
        name="images"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col gap-5">
            <label htmlFor="images" className="text-lg font-medium">
              <input
                type="file"
                id="images"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="rounded-xl w-full p-5 border border-dashed border-secondary-300 flex items-center justify-center transition cursor-pointer">
                Upload Images
              </div>
            </label>

            {images.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {images.map((file, index) => (
                  <div className="relative group" key={index}>
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`preview-${index}`}
                      className="w-full aspect-square md:aspect-square object-cover rounded-2xl"
                    />
                    <Button
                      type="button"
                      variant="primary-ghost"
                      onClick={() => handleDelete(index)}
                      className="absolute top-2 right-2 hover:bg-red-700 p-1 text-white bg-red-500"
                    >
                      <CloseIcon className="w-4 h-4" />{" "}
                      {/* Adjust size with w-4 h-4 */}
                    </Button>
                  </div>
                ))}
              </div>
            )}
            {errors.images && (
              <p className="text-red-500">{errors.images.message}</p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default Images;
