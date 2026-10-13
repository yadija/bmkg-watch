import { IconType } from 'react-icons';

interface WeatherParameterProps {
  title: string;
  icon: IconType;
  value: string;
}

export default function WeatherParameter({
  title,
  icon: Icon,
  value,
}: WeatherParameterProps) {
  return (
    <section
      className='flex h-20 flex-col items-center justify-center border border-gray-200 bg-white p-2 text-center'
      title={title}
    >
      <Icon size={22} className='text-blue-600' />
      <p className='mt-1 text-sm font-bold text-gray-900'>{value}</p>
      <p className='text-[10px] font-medium uppercase tracking-wider text-gray-500'>
        {title}
      </p>
    </section>
  );
}
