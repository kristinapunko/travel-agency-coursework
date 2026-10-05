import { tours } from '../data/tours.js';
import { validateBooking } from '../domain/bookingValidation.js';
import { ServiceError } from './ServiceError.js';

export function toBookingInput(input) {
  const result = validateBooking(input, tours);
  if (!result.ok) {
    throw new ServiceError('Перевірте поля заявки.', {
      code: 'VALIDATION',
      errors: result.errors,
    });
  }
  return result.value;
}

export function toBooking(value) {
  const valid =
    value !== null &&
    typeof value === 'object' &&
    typeof value.id === 'string' &&
    value.id.length > 0 &&
    typeof value.tourId === 'string' &&
    typeof value.customerName === 'string' &&
    typeof value.customerPhone === 'string' &&
    typeof value.customerEmail === 'string' &&
    Number.isInteger(Number(value.travelersCount)) &&
    typeof value.needsTransfer === 'boolean';

  if (!valid) {
    throw new ServiceError('Джерело повернуло некоректний запис заявки.', {
      code: 'BAD_DATA',
    });
  }

  return {
    id: value.id,
    tourId: String(value.tourId),
    customerName: value.customerName,
    customerPhone: value.customerPhone,
    customerEmail: value.customerEmail,
    travelersCount: Number(value.travelersCount),
    needsTransfer: Boolean(value.needsTransfer),
    notes: typeof value.notes === 'string' ? value.notes : '',
  };
}

export function toBookingList(value) {
  if (!Array.isArray(value)) {
    throw new ServiceError('Джерело повернуло некоректний список.', {
      code: 'BAD_DATA',
    });
  }

  const records = value.map(toBooking);
  const uniqueIds = new Set(records.map((r) => r.id));

  if (uniqueIds.size !== records.length) {
    throw new ServiceError('Джерело повернуло повторні ідентифікатори.', {
      code: 'BAD_DATA',
    });
  }

  return records;
}