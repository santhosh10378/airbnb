import { Controller } from "react-hook-form";
import Input from "../../elements/Input";
import Select from "../../elements/Select";
import { CURRENCIES } from "../../../data/currencies";

const Prices = ({ control, errors }) => {
  return (
    <>
      <Controller
        name="price"
        control={control}
        render={({ field }) => (
          <Input
            type="number"
            id="price"
            label="Price"
            placeholder="Enter the price"
            {...field}
            error={errors.price?.message}
            ariaLabel="Price"
            ariaRequired="true"
          />
        )}
      />
      <Controller
        name="extraGuestCharge"
        control={control}
        render={({ field }) => (
          <Input
            type="number"
            id="extraGuestCharge"
            label="Extra Guest Charge"
            placeholder="Enter the extra guest charge"
            {...field}
            error={errors.extraGuestCharge?.message}
            ariaLabel="Extra Guest Charge"
          />
        )}
      />

      <Controller
        name="currency"
        control={control}
        render={({ field }) => (
          <Select
            id="currency"
            label="Currency"
            options={CURRENCIES}
            {...field}
            aria-label="Currency"
            aria-invalid={errors.currency ? "true" : "false"}
            aria-describedby="currency-error"
          />
        )}
      />
    </>
  );
};

export default Prices;
