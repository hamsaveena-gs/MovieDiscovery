import Select from '@/components/ui/Select';

interface Option {
  value: string;
  label: string;
}

interface FilterSelectProps {
  value: string;
  placeholder: string;
  options: Option[];
  onChange: (value: string) => void;
}

export default function FilterSelect({ value, placeholder, options, onChange }: FilterSelectProps) {
  return (
    <Select
      value={value}
      placeholder={placeholder}
      options={options}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
