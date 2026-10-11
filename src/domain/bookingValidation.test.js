import { describe, expect, test } from 'vitest';
import { validateBooking } from './bookingValidation.js';
import { testTour, validBookingInput } from '../test/fixtures.js';

describe('validateBooking', () => {
  test('нормалізує коректні поля та не мутує вхідний об’єкт', () => {
    const input = Object.freeze({
      ...validBookingInput,
      customerName: `  ${validBookingInput.customerName}  `,
      travelersCount: '2',
      id: 'forbidden-id',
    });

    const result = validateBooking(input, [testTour]);
    expect(result.ok).toBe(true);
    expect(result.value.customerName).toBe('Христина Пунько');
    expect(result.value.travelersCount).toBe(2);
    expect(result.value).not.toHaveProperty('id');
  });

  test('відхиляє некоректний формат телефону', () => {
    const result = validateBooking({ ...validBookingInput, customerPhone: '123' }, [testTour]);
    expect(result.ok).toBe(false);
    expect(result.errors.customerPhone).toBeTruthy();
  });

  test('для групи понад 4 особи обов’язково вимагає трансфер', () => {
    const result = validateBooking(
      { ...validBookingInput, travelersCount: 5, needsTransfer: false },
      [testTour]
    );
    expect(result.ok).toBe(false);
    expect(result.errors.needsTransfer).toBeTruthy();
  });

  test('відхиляє бронювання без обраного або невідомого туру', () => {
    const result = validateBooking({ ...validBookingInput, tourId: 'missing-tour' }, [testTour]);
    expect(result.ok).toBe(false);
    expect(result.errors.tourId).toBeTruthy();
  });
});