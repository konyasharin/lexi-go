import { FC } from 'react';
import clsx from 'clsx';

interface HeaderProps {
  className: string;
}

export const Header: FC<HeaderProps> = props => {
  return <div className={clsx('bg-orange-400', props.className)}>123</div>;
};
