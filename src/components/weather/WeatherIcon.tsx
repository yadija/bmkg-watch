import { useState } from 'react';
import {
  WiCloud,
  WiCloudy,
  WiDayCloudy,
  WiDayHaze,
  WiDayRain,
  WiDayRainMix,
  WiDayShowers,
  WiDaySleet,
  WiDaySunny,
  WiDayThunderstorm,
  WiFog,
  WiNa,
  WiNightAltCloudy,
  WiNightAltRain,
  WiNightAltRainMix,
  WiNightAltShowers,
  WiNightAltSleet,
  WiNightAltThunderstorm,
  WiNightClear,
  WiSmog,
} from 'react-icons/wi';

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
  imageUrl,
  alt = 'Kondisi Cuaca',
  size = 120,
}: WeatherIconProps) {
  const [imageError, setImageError] = useState(false);

  if (imageUrl && !imageError) {
    return (
      <img
        src={imageUrl}
        alt={alt}
        width={size}
        height={size}
        onError={() => setImageError(true)}
        className='size-[100px] object-contain drop-shadow-md lg:size-[120px]'
        loading='lazy'
      />
    );
  }

  const strValue = String(value ?? '');

  switch (strValue) {
    case '0':
      return day ? <WiDaySunny size={size} /> : <WiNightClear size={size} />;
    case '1':
    case '2':
      return day ? <WiDayCloudy size={size} /> : <WiNightAltCloudy size={size} />;
    case '3':
      return <WiCloud size={size} />;
    case '4':
      return <WiCloudy size={size} />;
    case '5':
      return day ? <WiDayHaze size={size} /> : <WiFog size={size} />;
    case '10':
      return <WiSmog size={size} />;
    case '45':
      return <WiFog size={size} />;
    case '60':
      return day ? <WiDayShowers size={size} /> : <WiNightAltShowers size={size} />;
    case '61':
      return day ? <WiDaySleet size={size} /> : <WiNightAltSleet size={size} />;
    case '63':
      return day ? <WiDayRain size={size} /> : <WiNightAltRain size={size} />;
    case '80':
      return day ? <WiDayRainMix size={size} /> : <WiNightAltRainMix size={size} />;
    case '95':
    case '99':
      return day ? (
        <WiDayThunderstorm size={size} />
      ) : (
        <WiNightAltThunderstorm size={size} />
      );
    default:
      return <WiNa size={size} title='Tidak diketahui' />;
  }
}
