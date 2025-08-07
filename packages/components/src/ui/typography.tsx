import { FC, ReactNode } from 'react';
import { clsx } from 'clsx';

type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

interface TypographyProps {
  tag?: Tag;
  variant?: Tag;
  className?: string;
  children?: ReactNode;
}

export const Typography: FC<TypographyProps> = props => {
  const Tag = props.tag ?? 'p';
  const variant = props.variant ?? Tag;

  return (
    <Tag
      className={clsx(
        {
          'text-4xl font-extrabold': variant === 'h1',
          'text-3xl font-bold': variant === 'h2',
          'text-2xl font-black': variant === 'h3',
          'text-xl font-medium': variant === 'h4',
          'text-lg font-medium': variant === 'h5',
          'text-base font-medium': variant === 'h6',
          'text-base font-normal': variant === 'p',
        },
        props.className,
      )}
    >
      {props.children}
    </Tag>
  );
};
