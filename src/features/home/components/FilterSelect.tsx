import Select from '@/components/ui/Select';

interface Option {
  value: string;
  label: string;
}

interface FilterSelectProps {
  name: string;
  value: string;
  placeholder: string;
  options: Option[];
  onChange: (value: string) => void;
}

export default function FilterSelect({ name, value, placeholder, options, onChange }: FilterSelectProps) {
  return (
    <Select
      name={name}
      id={name}
      value={value}
      placeholder={placeholder}
      options={options}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
