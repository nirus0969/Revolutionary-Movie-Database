import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { BigMovieData } from '../../types/gqlResponses.ts';
import Rating from './Rating.tsx';
import { useErrorMessage } from '../../hooks/useErrorMessage.ts';

type RateMovieProps = {
  movie: BigMovieData;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const RateMovie = ({ movie, isOpen, onOpenChange }: RateMovieProps) => {
  const { errorMessage, setErrorMessage } = useErrorMessage(3000);
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="text-center">
        {(onClose) => (
          <>
            <ModalHeader>
              <h3>Rate '{movie.original_title}'</h3>
            </ModalHeader>
            <ModalBody>
              {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
              <h2>Give your rating:</h2>
              <div className="flex items-center justify-center gap-2">
                <Rating
                  rating={movie.vote_average}
                  movieId={movie._id}
                  voteCount={movie.vote_count}
                  updateRatingOnHover
                  setErrorMessage={setErrorMessage}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onPress={onClose}>
                Dismiss
              </Button>
              <Button
                data-testid="ratingmodal-confirm-button"
                onPress={() => {
                  onClose();
                  location.reload();
                }}
                className="bg-navbar text-white"
              >
                Confirm
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default RateMovie;
