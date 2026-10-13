import {
  LuCloud,
  LuCloudFog,
  LuCloudLightning,
  LuCloudMoon,
  LuCloudMoonRain,
  LuCloudRain,
  LuCloudSun,
  LuCloudSunRain,
  LuMoon,
  LuSun,
} from 'react-icons/lu';

interface WeatherIconProps {
  value?: string | number;
  day?: boolean;
  imageUrl?: string;
  alt?: string;
  size?: number;
}

export default function WeatherIcon({
  value,
  day = true,
  alt = 'Kondisi Cuaca',
  size = 72,
}: WeatherIconProps) {
  const strValue = String(value ?? '');
  const altLower = (alt || '').toLowerCase();

  // match weather code to modern flat vector icons
  switch (strValue) {
    case '0':
      return day ? (
        <LuSun
          size={size}
          strokeWidth={1.75}
          className='text-amber-500'
          aria-label={alt}
        />
      ) : (
        <LuMoon
          size={size}
          strokeWidth={1.75}
          className='text-indigo-400'
          aria-label={alt}
        />
      );
    case '1':
    case '2':
      return day ? (
        <LuCloudSun
          size={size}
          strokeWidth={1.75}
          className='text-amber-500'
          aria-label={alt}
        />
      ) : (
        <LuCloudMoon
          size={size}
          strokeWidth={1.75}
          className='text-indigo-400'
          aria-label={alt}
        />
      );
    case '3':
      return (
        <LuCloud
          size={size}
          strokeWidth={1.75}
          className='text-gray-500'
          aria-label={alt}
        />
      );
    case '4':
      return (
        <LuCloud
          size={size}
          strokeWidth={1.75}
          className='text-gray-600'
          aria-label={alt}
        />
      );
    case '5':
    case '10':
    case '45':
      return (
        <LuCloudFog
          size={size}
          strokeWidth={1.75}
          className='text-gray-400'
          aria-label={alt}
        />
      );
    case '60':
    case '80':
      return day ? (
        <LuCloudSunRain
          size={size}
          strokeWidth={1.75}
          className='text-blue-500'
          aria-label={alt}
        />
      ) : (
        <LuCloudMoonRain
          size={size}
          strokeWidth={1.75}
          className='text-blue-400'
          aria-label={alt}
        />
      );
    case '61':
      return (
        <LuCloudRain
          size={size}
          strokeWidth={1.75}
          className='text-blue-500'
          aria-label={alt}
        />
      );
    case '63':
      return (
        <LuCloudRain
          size={size}
          strokeWidth={1.75}
          className='text-blue-600'
          aria-label={alt}
        />
      );
    case '95':
    case '97':
    case '99':
      return (
        <LuCloudLightning
          size={size}
          strokeWidth={1.75}
          className='text-amber-600'
          aria-label={alt}
        />
      );
    default:
      // fallback matching by description text if code is not provided or unknown
      if (altLower.includes('petir')) {
        return (
          <LuCloudLightning
            size={size}
            strokeWidth={1.75}
            className='text-amber-600'
            aria-label={alt}
          />
        );
      }
      if (altLower.includes('hujan')) {
        return (
          <LuCloudRain
            size={size}
            strokeWidth={1.75}
            className='text-blue-500'
            aria-label={alt}
          />
        );
      }
      if (
        altLower.includes('kabut') ||
        altLower.includes('asap') ||
        altLower.includes('kabur')
      ) {
        return (
          <LuCloudFog
            size={size}
            strokeWidth={1.75}
            className='text-gray-400'
            aria-label={alt}
          />
        );
      }
      if (altLower.includes('cerah')) {
        return day ? (
          <LuSun
            size={size}
            strokeWidth={1.75}
            className='text-amber-500'
            aria-label={alt}
          />
        ) : (
          <LuMoon
            size={size}
            strokeWidth={1.75}
            className='text-indigo-400'
            aria-label={alt}
          />
        );
      }
      return (
        <LuCloud
          size={size}
          strokeWidth={1.75}
          className='text-gray-400'
          aria-label={alt}
        />
      );
  }
}
