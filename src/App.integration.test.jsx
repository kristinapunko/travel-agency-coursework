import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useLocation } from 'react-router';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import App from './App.jsx';
import { bookingService } from './services/bookingService.js';
import { ServiceError } from './services/ServiceError.js';
import { savedBooking } from './test/fixtures.js';
import { deferred } from './test/deferred.js';

vi.mock('./services/bookingService.js', () => ({
  bookingService: {
    getAll: vi.fn(),
    getById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

beforeEach(() => {
  for (const method of Object.values(bookingService)) method.mockReset();
  bookingService.getAll.mockResolvedValue([{ ...savedBooking }]);
  bookingService.getById.mockResolvedValue({ ...savedBooking });
  bookingService.create.mockImplementation(async (input) => ({ ...input, id: 'book-new-123' }));
  bookingService.update.mockImplementation(async (id, input) => ({ ...input, id }));
  bookingService.delete.mockResolvedValue(undefined);
});

afterEach(() => {
  vi.restoreAllMocks();
});

function LocationProbe() {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}{location.search}</div>;
}

function renderApp(path = '/bookings') {
  const user = userEvent.setup();
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
      <LocationProbe />
    </MemoryRouter>
  );
  return user;
}

test('показує стан завантаження до отримання списку заявок', async () => {
  const pending = deferred();
  bookingService.getAll.mockReturnValueOnce(pending.promise);

  renderApp();
  expect(screen.getByText(/Завантаження заявок…/i)).toBeInTheDocument();

  await act(async () => {
    pending.resolve([savedBooking]);
    await pending.promise;
  });

  expect(await screen.findByText(savedBooking.customerName)).toBeInTheDocument();
});

test('відновлюється після відмови читання через кнопку «Спробувати ще раз»', async () => {
  bookingService.getAll
    .mockRejectedValueOnce(new ServiceError('Мережевий збій'))
    .mockResolvedValueOnce([savedBooking]);

  const user = renderApp();
  expect(await screen.findByText('Мережевий збій')).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /Спробувати ще раз/i }));
  expect(await screen.findByText(savedBooking.customerName)).toBeInTheDocument();
});

test('скасування модального підтвердження не викликає видалення на сервісі', async () => {
  vi.spyOn(window, 'confirm').mockReturnValue(false);
  const user = renderApp('/bookings');

  await screen.findByText(savedBooking.customerName);
  const deleteBtn = screen.getByRole('button', { name: /Видалити/i });
  await user.click(deleteBtn);

  expect(bookingService.delete).not.toHaveBeenCalled();
});