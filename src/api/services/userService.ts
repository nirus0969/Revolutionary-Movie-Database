import { UserInput } from '../../types/gqlRequestBody.ts';
import client from '../client.ts';
import { CREATE_USER } from '../requests/mutations.ts';
import { GET_USER } from '../requests/queries.ts';
import { User } from '../../types/gqlResponses.ts';

type UserVerificationResponse = {
  verifyUser: {
    user: User;
    error: string;
  };
};

export async function verifyUser(userInput: UserInput): Promise<User | null> {
  try {
    const { data } = await client.query<UserVerificationResponse>({
      query: GET_USER,
      variables: { credentials: userInput },
    });

    if (data.verifyUser.error) {
      return null;
    }

    return data.verifyUser.user;
  } catch (error) {
    console.error(`Error verifying user with username ${userInput.username}:`, error);
    throw error;
  }
}

type CreateUserResponse = {
  insertUser: User;
};

export async function createUser(userInput: UserInput): Promise<User | null> {
  try {
    const { data } = await client.mutate<CreateUserResponse>({
      mutation: CREATE_USER,
      variables: { user: userInput },
    });

    if (data && data.insertUser) {
      console.log(data.insertUser);
      return data.insertUser;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}
