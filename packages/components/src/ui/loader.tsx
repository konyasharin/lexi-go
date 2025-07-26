import { FC } from 'react';
import { HashLoader } from 'react-spinners';
import colors from 'tailwindcss/colors';

import { Typography } from '@/ui/typography';

interface LoaderProps {
  size?: number;
  color?: string;
  label?: string;
  className?: string;
}

export const Loader: FC<LoaderProps> = props => {
  return (
    <div>
      {props.label && <Typography>{props.label}</Typography>}
      <HashLoader color={props.color ?? colors.white} size={props.size ?? 32} />
    </div>
  );
};
