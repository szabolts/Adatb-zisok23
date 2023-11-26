import { extendVariants, Select } from "@nextui-org/react";

export const SelectXs = extendVariants(Select, {
  variants: {
    size: {
      xs: {
        label: "text-tiny",
        trigger: "h-unit-6 min-h-unit-6 px-1 rounded-small",
        value: "text-tiny",
      },
      sm: {
        label: "text-tiny",
        trigger: "h-unit-8 min-h-unit-8 px-2 rounded-small",
        value: "text-small",
      },
      md: {
        trigger: "h-unit-10 min-h-unit-10 rounded-medium",
        value: "text-small",
      },
      lg: {
        trigger: "h-unit-12 min-h-unit-12 rounded-large",
        value: "text-medium",
      },
    },
  },
});
