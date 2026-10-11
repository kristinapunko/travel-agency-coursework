import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import BookingPage from './BookingPage.jsx';
import { testTour, validBookingInput, savedBooking } from '../../test/fixtures.js';
import { deferred } from '../../test/deferred.js';

function renderEditor(onSave = vi.fn()) {
  return render(
    <BookingPage
      tour={testTour}
      onSave={onSave}
      onCancel={vi.fn()}
    />
  );
}

test('не дозволяє збереження з порожніми полями та спрямовує фокус на першу помилку', async () => {
  const user = userEvent.setup();
  const onSave = vi.fn();
  renderEditor(onSave);

  await user.click(screen.getByRole('button', { name: /Зберегти заявку/i }));

  const nameInput = screen.getByRole('textbox', { name: /Прізвище та ім'я/i });
  expect(nameInput).toHaveAttribute('aria-invalid', 'true');
  expect(nameInput).toHaveFocus();
  expect(onSave).not.toHaveBeenCalled();
});

test('блокує повторні натискання кнопки під час очікування відповіді', async () => {
  const user = userEvent.setup();
  const pending = deferred();
  const onSave = vi.fn().mockReturnValue(pending.promise);
  renderEditor(onSave);

  await user.type(screen.getByRole('textbox', { name: /Прізвище та ім'я/i }), validBookingInput.customerName);
  await user.type(screen.getByRole('textbox', { name: /Номер телефону/i }), validBookingInput.customerPhone);
  await user.type(screen.getByRole('textbox', { name: /Електронна пошта/i }), validBookingInput.customerEmail);

  const submitButton = screen.getByRole('button', { name: /Зберегти заявку/i });
  await user.click(submitButton);

  expect(screen.getByRole('button', { name: /Збереження…/i })).toBeDisabled();
  expect(onSave).toHaveBeenCalledTimes(1);

  await act(async () => {
    pending.resolve({ ok: true, record: savedBooking });
    await pending.promise;
  });
});

test('зберігає введені дані чернетки при отриманні помилки від сервісу', async () => {
  const user = userEvent.setup();
  const onSave = vi.fn().mockResolvedValueOnce({
    ok: false,
    message: 'Сервіс тимчасово недоступний.',
  });
  renderEditor(onSave);

  const nameInput = screen.getByRole('textbox', { name: /Прізвище та ім'я/i });
  await user.type(nameInput, validBookingInput.customerName);
  await user.type(screen.getByRole('textbox', { name: /Номер телефону/i }), validBookingInput.customerPhone);
  await user.type(screen.getByRole('textbox', { name: /Електронна пошта/i }), validBookingInput.customerEmail);

  await user.click(screen.getByRole('button', { name: /Зберегти заявку/i }));

  expect(await screen.findByRole('alert')).toHaveTextContent('Сервіс тимчасово недоступний.');
  expect(nameInput).toHaveValue(validBookingInput.customerName);
});