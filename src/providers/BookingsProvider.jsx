import { useCallback, useEffect, useRef, useState } from 'react';

import { BookingsContext } from '../context/BookingsContext.js';
import { bookingService } from '../services/bookingService.js';
import { errorMessage } from '../services/ServiceError.js';

export default function BookingsProvider({ children }) {
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [isMutating, setIsMutating] = useState(false);

  const activeRead = useRef(null);
  const readVersion = useRef(0);
  const mutationLock = useRef(false);
  const mounted = useRef(false);

  const reload = useCallback(async () => {
    if (mutationLock.current) return;

    activeRead.current?.abort();

    const controller = new AbortController();
    activeRead.current = controller;

    const version = ++readVersion.current;

    setStatus('loading');
    setError('');

    try {
      const records = await bookingService.getAll({
        signal: controller.signal,
      });

      if (controller.signal.aborted || version !== readVersion.current) {
        return;
      }

      setBookings(records);
      setStatus('success');
    } catch (cause) {
      if (controller.signal.aborted || version !== readVersion.current) {
        return;
      }

      setError(errorMessage(cause));
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    mounted.current = true;

    const controller = new AbortController();
    activeRead.current = controller;

    const version = ++readVersion.current;

    async function loadInitialBookings() {
      try {
        const records = await bookingService.getAll({
          signal: controller.signal,
        });

        if (controller.signal.aborted || version !== readVersion.current) {
          return;
        }

        setBookings(records);
        setStatus('success');
        setError('');
      } catch (cause) {
        if (controller.signal.aborted || version !== readVersion.current) {
          return;
        }

        setError(errorMessage(cause));
        setStatus('error');
      }
    }

    void loadInitialBookings();

    return () => {
      mounted.current = false;
      controller.abort();
      readVersion.current += 1;
    };
  }, []);

const mutate = useCallback(
  async (operation, apply, message) => {
    if (mutationLock.current || status !== 'success') {
      return {
        ok: false,
        message: 'Дочекайтеся завершення поточної операції.',
      };
    }

    mutationLock.current = true;
    setIsMutating(true);
    setNotice('');

    activeRead.current?.abort();
    readVersion.current += 1;

    try {
      const record = await operation();

      if (mounted.current) {
        setBookings((previous) => apply(previous, record));
        setNotice(message);
      }

      return {
        ok: true,
        record,
      };
    } catch (cause) {
      return {
        ok: false,
        message: errorMessage(cause),
        errors: cause?.errors,
        code: cause?.code,
      };
    } finally {
      mutationLock.current = false;

      if (mounted.current) {
        setIsMutating(false);
      }
    }
  },
  [status]
);

  function createBooking(input) {
    return mutate(
      () => bookingService.create(input),
      (previous, record) => [
        ...previous.filter((entry) => entry.id !== record.id),
        record,
      ],
      'Заявку успішно оформлено.'
    );
  }

  function updateBooking(id, input) {
    return mutate(
      () => bookingService.update(id, input),
      (previous, record) =>
        previous.map((entry) => (entry.id === id ? record : entry)),
      'Зміни заявки збережено.'
    );
  }

  function deleteBooking(id) {
    return mutate(
      () => bookingService.delete(id),
      (previous) => previous.filter((entry) => entry.id !== id),
      'Заявку видалено.'
    );
  }

  return (
    <BookingsContext.Provider
      value={{
        bookings,
        status,
        error,
        notice,
        isMutating,
        reload,
        createBooking,
        updateBooking,
        deleteBooking,
        clearNotice: () => setNotice(''),
      }}
    >
      {children}
    </BookingsContext.Provider>
  );
}
