import { FC } from 'react';

import { Typography } from '@/ui/typography';

interface LogoProps {
  className?: string;
}

export const Logo: FC<LogoProps> = props => {
  return (
    <div className={props.className}>
      <Typography tag={'h1'} variant={'h2'}>
        lexi-go
      </Typography>
    </div>
  );
};
