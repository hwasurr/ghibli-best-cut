import {
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useBreakpointValue,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import { useCutQuery } from '../../generated/graphql';
import { FilmCutDetail } from './FilmCutDetail';
import FilmCutNavButton from './FilmCutNavButton';

interface FilmCutModalProps {
  open: boolean;
  onClose: () => void;
  cutId: number;
  onClick: (cutId: number) => void;
}

function FilmCutModal({
  open,
  onClose,
  cutId,
  onClick,
}: FilmCutModalProps): React.ReactElement {
  const { loading, data } = useCutQuery({
    variables: { cutId: Number(cutId) },
  });
  const rightButtonRef = useRef<HTMLButtonElement>(null);
  const modalSize = useBreakpointValue({ base: 'full', md: 'xl' });

  const onNextClick = () => onClick(cutId + 1);
  const onPrevClick = () => onClick(cutId - 1);

  return (
    <Modal
      onClose={onClose}
      isOpen={open}
      isCentered
      size={modalSize}
      preserveScrollBarGap
      initialFocusRef={rightButtonRef}
    >
      <ModalOverlay />
      <ModalContent pt={2}>
        <ModalHeader>{data?.cut?.film?.title}</ModalHeader>
        <ModalCloseButton mt={3} />
        <ModalBody pos="relative">
          {loading && (
            <Center py={4} minH={300}>
              <Spinner />
            </Center>
          )}
          {!loading && !data && <Center>데이터를 불러오지 못했습니다.</Center>}
          {data && data.cut && (
            <FilmCutDetail
              cutImg={data.cut.src}
              cutId={data.cut.id}
              votesCount={data.cut.votesCount}
              isVoted={data.cut.isVoted}
              reviews={data.cutReviews}
            />
          )}
          <FilmCutNavButton
            onClick={onPrevClick}
            direction="left"
            display={{ base: 'none', md: 'block' }}
          />
          <FilmCutNavButton
            onClick={onNextClick}
            direction="right"
            display={{ base: 'none', md: 'block' }}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default FilmCutModal;
