"use client";

import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { Controller, Control, FieldError } from "react-hook-form";

// Define props interface
export interface SelectFieldProps {
  name: string;
  label: string;
  placeholder: string;
  options: { value: string; label: string }[];
  control: Control<any>;
  error?: FieldError;
  required?: boolean;
}

export const SelectFields: React.FC<SelectFieldProps> = ({
  name,
  label,
  placeholder,
  options,
  control,
  error,
  required = false,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="form-label">
        {label}
      </Label>

      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? `Please select ${label.toLowerCase()}` : false,
        }}
        render={({ field }) => (
          <div>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="select-trigger">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>

              <SelectContent className="bg-gray-800 border-gray-600 text-white">
                {options.map((option) => (
                  <SelectItem
                    value={option.value}
                    key={option.value}
                    className="focus:bg-gray-700 focus:text-white"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {error && (
              <p className="text-sm text-red-500 mt-1">{error.message}</p>
            )}
          </div>
        )}
      />
    </div>
  );
};
export default SelectFields;
