import { FC, ReactNode } from 'react';

interface HeaderGroupProps {
  children?: ReactNode;
}

export const HeaderGroup: FC<HeaderGroupProps> = props => {
  return <div className={'flex gap-5 items-center'}>{props.children}</div>;
};
