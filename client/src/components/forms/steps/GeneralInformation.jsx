import { Controller } from "react-hook-form";
import Input from "../../elements/Input";
import { SimpleMdeReact } from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const GeneralInformation = ({ control, errors }) => {
  return (
    <>
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <Input
            type="text"
            id="title"
            label="Title"
            placeholder="Enter the title"
            {...field}
            error={errors.title?.message}
            ariaLabel="Title"
            ariaRequired="true"
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMdeReact
            options={{
              autofocus: true,
              spellChecker: false,
            }}
            {...field}
          />
        )}
      />
    </>
  );
};

export default GeneralInformation;
