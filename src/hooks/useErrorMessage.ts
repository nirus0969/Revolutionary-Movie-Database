import { useState, useCallback, useEffect } from 'react';

export const useErrorMessage = (timeout: number) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorTimeout, setErrorTimeout] = useState<NodeJS.Timeout | null>(null);

  const triggerErrorMessage = useCallback(
    (message: string) => {
      if (errorTimeout) {
        clearTimeout(errorTimeout);
      }

      setErrorMessage(message);

      const newTimeout = setTimeout(() => {
        setErrorMessage(null);
      }, timeout);

      setErrorTimeout(newTimeout);
    },
    [timeout, errorTimeout]
  );

  useEffect(() => {
    return () => {
      if (errorTimeout) {
        clearTimeout(errorTimeout);
      }
    };
  }, [errorTimeout]);

  return { errorMessage, setErrorMessage: triggerErrorMessage };
};
