import { FC, ReactNode } from 'react';
import { clsx } from 'clsx';

interface ContainerProps {
  className?: string;
  children?: ReactNode;
}

export const Container: FC<ContainerProps> = props => {
  return (
    <div
      className={clsx(
        'mx-auto my-0 2xl:w-[1340px] xl:w-[1050px] lg:w-[860px] md:w-[620px] sm:w-10/12 w-11/12',
        props.className,
      )}
    >
      {props.children}
    </div>
  );
};
