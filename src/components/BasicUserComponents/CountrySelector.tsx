import { selectCountries } from "@/features/countries/countrySlice";
import { getAllCountriesThunk } from "@/features/countries/countryThunk";
import type { AppDispatch } from "@/store";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Select, {
  components,
  type MenuListProps,
  type SingleValue,
} from "react-select";
import { FixedSizeList as List } from "react-window";

interface CountryselectorProps {
  onSelect: (countryName: string | null) => void;
}

interface CountryOption {
  label: string;
  value: string;
}

const height = 35; // height of each item
const maxItems = 7; // visible items

const MenuList = <Option, IsMulti extends boolean = false>(
  props: MenuListProps<Option, IsMulti>
) => {
  const { options, children, getValue } = props;
  const [value] = getValue();
  const initialOffset = options.indexOf(value) * height;
  const childrenArray = React.Children.toArray(children);

  return (
    <components.MenuList {...props}>
      <List
        height={height * maxItems}
        itemCount={childrenArray.length}
        itemSize={height}
        initialScrollOffset={initialOffset}
        width="100%"
      >
        {({ index, style }) => <div style={style}>{childrenArray[index]}</div>}
      </List>
    </components.MenuList>
  );
};

export default function CountrySelector({ onSelect }: CountryselectorProps) {
  const dispatch = useDispatch<AppDispatch>();
  const countries = useSelector(selectCountries);

  // fill contries
  useEffect(() => {
    if (!countries) {
      dispatch(getAllCountriesThunk());
    }
  }, [countries, dispatch]);

  const options: CountryOption[] | undefined = countries?.map((c) => ({
    label: c.countryName,
    value: c.countryId.toString(),
  }));

  return (
    <Select
      className="border-gray-300"
      components={{ MenuList }}
      options={options}
      placeholder="Select a country"
      onChange={(newValue, _actionMeta) => {
        const selected = newValue as SingleValue<CountryOption>;

        const selectedCountry =
          countries?.find((c) => c.countryId.toString() === selected?.value) ||
          null;
        onSelect(selectedCountry ? selectedCountry.countryName : null);
      }}
      isSearchable
    />
  );
}
