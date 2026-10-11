import { expect, test } from 'vitest';
import { selectBookings } from './selectBookings.js';
import { testTour, savedBooking } from '../test/fixtures.js';

test('фільтрує за запитом і трансфером без мутації вихідного масиву', () => {
  const bookings = Object.freeze([
    Object.freeze({ ...savedBooking, id: 'b-1', travelersCount: 4, needsTransfer: true }),
    Object.freeze({ ...savedBooking, id: 'b-2', travelersCount: 1, needsTransfer: false }),
    Object.freeze({ ...savedBooking, id: 'b-3', customerName: 'Олег', needsTransfer: true }),
  ]);

  const result = selectBookings(bookings, [testTour], {
    query: 'Христина',
    transfer: 'yes',
    sort: 'travelers-asc',
  });

  expect(result.map((b) => b.id)).toEqual(['b-1']);
  expect(bookings.length).toBe(3);
});