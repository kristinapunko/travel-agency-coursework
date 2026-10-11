import { tours } from '../data/tours.js';

export const testTour = tours[0] ?? {
  id: 'tour-001',
  name: 'Тур у Карпати',
  price: 4500,
  isAvailable: true,
};

export const validBookingInput = {
  tourId: String(testTour.id),
  customerName: 'Христина Пунько',
  customerPhone: '+380501234567',
  customerEmail: 'krystyna@example.com',
  travelersCount: 2,
  needsTransfer: false,
  notes: 'Місця біля вікна',
};

export const savedBooking = {
  ...validBookingInput,
  id: 'book-test-001',
};