import { Box, BoxProps, IconButton } from '@chakra-ui/react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

interface FilmCutNavButtonProps extends Omit<BoxProps, 'position'> {
  onClick: () => void;
  direction: 'left' | 'right';
  position?: Partial<Record<'left' | 'right', number>>;
}
export function FilmCutNavButton({
  onClick,
  direction,
  position,
  ...rest
}: FilmCutNavButtonProps): JSX.Element {
  const left = position
    ? position.left
    : direction === 'left'
    ? -12
    : undefined;
  const right = position
    ? position.right
    : direction === 'right'
    ? -12
    : undefined;

  return (
    <Box
      pos="absolute"
      left={left}
      right={right}
      top={'calc(50% - 32px)'}
      {...rest}
    >
      <IconButton
        variant={'solid'}
        size={'md'}
        rounded={'full'}
        icon={direction === 'left' ? <MdChevronLeft /> : <MdChevronRight />}
        aria-label="picture-to-left"
        onClick={onClick}
      ></IconButton>
    </Box>
  );
}

export default FilmCutNavButton;
