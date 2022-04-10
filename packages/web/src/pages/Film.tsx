import { Box, Spinner, Text, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommonLayout from '../components/CommonLayout';
import FilmCutList from '../components/film-cut/FilmCutList';
import FilmCutModal from '../components/film-cut/FilmCutModal';
import FilmDetail from '../components/film/FIlmDetail';
import { useFilmQuery } from '../generated/graphql';

interface FilmPageParams {
  filmId?: string;
}

function Film(): React.ReactElement {
  const { filmId } = useParams<FilmPageParams>();
  const { data, loading, error } = useFilmQuery({
    variables: { filmId: Number(filmId) },
  });

  // Selected cut, Modal states
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCutId, setSelectedCutId] = useState<number>();
  const handleCutSelect = (cutId: number) => {
    setSelectedCutId(cutId); // cut id
    onOpen(); // modal open
  };

  const onNextClick = () => {
    setSelectedCutId((selectedCutId || 0) + 1);
  };
  const onPrevClick = () => {
    setSelectedCutId((selectedCutId || 0) - 1);
  };
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'ArrowRight') onNextClick();
    if (e.code === 'ArrowLeft') onPrevClick();
  };
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCutId]);

  return (
    <CommonLayout>
      {loading && <Spinner />}
      {error && <Text>페이지를 표시할 수 없습니다.</Text>}
      {filmId && data?.film ? (
        <>
          <FilmDetail film={data.film} />
          <Box mt={12}>
            <FilmCutList filmId={data.film.id} onClick={handleCutSelect} />
          </Box>
        </>
      ) : (
        <Text>페이지를 표시할 수 없습니다.</Text>
      )}

      {!selectedCutId ? null : (
        <FilmCutModal
          open={isOpen}
          onClose={onClose}
          cutId={selectedCutId}
          onClick={handleCutSelect}
        />
      )}
    </CommonLayout>
  );
}

export default Film;
