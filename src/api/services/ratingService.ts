import { UPDATE_RATING } from '../requests/mutations.ts';
import { RatingInput } from '../../types/gqlRequestBody.ts';
import client from '../client.ts';

export async function updateRating(ratingInput: RatingInput): Promise<boolean> {
  try {
    const { data } = await client.mutate({
      mutation: UPDATE_RATING,
      variables: { ratingInput },
    });
    return data.changeRating;
  } catch (error) {
    console.error('Error updating rating:', error);
    return false;
  }
}
