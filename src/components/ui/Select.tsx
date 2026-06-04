import { SelectHTMLAttributes } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  placeholder?: string;
}

const baseClass = `
  px-4 py-2.5 rounded-xl bg-gray-900 text-white text-sm
  border border-gray-700
  hover:border-gray-500
  focus:outline-none focus:border-white focus:ring-1 focus:ring-white
  transition-all cursor-pointer appearance-none
  bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%239ca3af' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E")]
  bg-no-repeat bg-[right_0.75rem_center] pr-9
`.trim();

export default function Select({ options, placeholder, className = '', value, ...props }: SelectProps) {
  return (
    <select
      value={value}
      className={`${baseClass} ${value ? 'border-white text-white' : 'text-gray-400'} ${className}`.trim()}
      {...props}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}
