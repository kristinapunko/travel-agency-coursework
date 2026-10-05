import { bookings as initialBookings } from '../data/bookings.js';
import { ServiceError } from './ServiceError.js';
import { toBookingInput, toBookingList } from './bookingContract.js';

const storageKey = 'travel_agency.bookings.v1';

const failures = new Set();

export function failNextMockBooking(operation) {
  console.log('[MOCK FAILURE] scheduled:', operation);
  failures.add(operation);
}

function pause(signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('Aborted', 'AbortError'));
      return;
    }

    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', abort);
      resolve();
    }, 600);

    function abort() {
      clearTimeout(timer);
      signal?.removeEventListener('abort', abort);
      reject(new DOMException('Aborted', 'AbortError'));
    }

    signal?.addEventListener('abort', abort, { once: true });
  });
}

async function before(operation, signal) {
  console.log('[MOCK SERVICE] before:', operation);
  console.log('[MOCK SERVICE] pending failures:', [...failures]);

  await pause(signal);

  if (failures.delete(operation)) {
    console.log('[MOCK FAILURE] triggered:', operation);

    throw new ServiceError(
      'Навчальна відмова сервісу. Повторіть дію.',
      {
        code: 'MOCK_FAILURE',
      }
    );
  }

  console.log('[MOCK SERVICE] operation allowed:', operation);
}

function read() {
  try {
    const raw = localStorage.getItem(storageKey);

    return toBookingList(
      raw === null ? initialBookings : JSON.parse(raw)
    );
  } catch (error) {
    if (error instanceof ServiceError) {
      throw error;
    }

    throw new ServiceError(
      'Не вдалося прочитати локальні дані.',
      {
        code: 'STORAGE_READ',
      }
    );
  }
}

function write(records) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(records));
  } catch {
    throw new ServiceError(
      'Не вдалося зберегти локальні дані.',
      {
        code: 'STORAGE_WRITE',
      }
    );
  }
}

function findRecord(records, id) {
  const record = records.find((entry) => entry.id === id);

  if (!record) {
    throw new ServiceError('Заявку не знайдено.', {
      code: 'NOT_FOUND',
    });
  }

  return record;
}

export const mockBookingService = {
  async getAll({ signal } = {}) {
    await before('getAll', signal);
    return read();
  },

  async getById(id, { signal } = {}) {
    await before('getById', signal);
    return findRecord(read(), id);
  },

  async create(input) {
    console.log('[MOCK SERVICE] create called:', input);

    const value = toBookingInput(input);

    await before('create');

    const records = read();

    const record = {
      ...value,
      id: `book-${crypto.randomUUID().slice(0, 8)}`,
    };

    write([...records, record]);

    console.log('[MOCK SERVICE] create succeeded:', record.id);

    return { ...record };
  },

  async update(id, input) {
    const value = toBookingInput(input);

    await before('update');

    const records = read();

    findRecord(records, id);

    const record = {
      ...value,
      id,
    };

    write(
      records.map((entry) =>
        entry.id === id ? record : entry
      )
    );

    return { ...record };
  },

  async delete(id) {
    await before('delete');

    const records = read();

    findRecord(records, id);

    write(
      records.filter((entry) => entry.id !== id)
    );
  },
};