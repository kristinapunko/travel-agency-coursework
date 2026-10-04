export function validateBooking(input, tours = []) {
    const errors = {};
  
    const name = typeof input.customerName === "string" ? input.customerName.trim() : "";
    const phone = typeof input.customerPhone === "string" ? input.customerPhone.trim() : "";
    const email = typeof input.customerEmail === "string" ? input.customerEmail.trim() : "";
    const notes = typeof input.notes === "string" ? input.notes.trim() : "";
    const countText = String(input.travelersCount ?? "").trim();
    const travelersCount = Number(countText);
    const needsTransfer = Boolean(input.needsTransfer);
  
    if (!tours.some((t) => String(t.id) === String(input.tourId))) {
      errors.tourId = "Виберіть наявний тур із каталогу.";
    }
  
    if (name.length === 0) {
      errors.customerName = "Вкажіть прізвище та ім'я клієнта.";
    } else if (name.length < 3 || name.length > 60) {
      errors.customerName = "Ім'я має містити від 3 до 60 символів.";
    }
  
    const phoneRegex = /^\+?[0-9]{10,13}$/;
    if (phone.length === 0) {
      errors.customerPhone = "Вкажіть номер телефону.";
    } else if (!phoneRegex.test(phone)) {
      errors.customerPhone = "Формат: +380XXXXXXXXX (від 10 до 13 цифр).";
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length === 0) {
      errors.customerEmail = "Вкажіть адресу електронної пошти.";
    } else if (!emailRegex.test(email)) {
      errors.customerEmail = "Введіть коректний email (наприклад: name@mail.com).";
    }
  
    if (countText === "") {
      errors.travelersCount = "Вкажіть кількість туристів.";
    } else if (!Number.isInteger(travelersCount) || travelersCount < 1 || travelersCount > 10) {
      errors.travelersCount = "Кількість туристів має бути цілим числом від 1 до 10.";
    }
  
    if (!errors.travelersCount && travelersCount > 4 && !needsTransfer) {
      errors.needsTransfer = "Для групи понад 4 особи трансфер обов'язковий.";
    }
  
    if (notes.length > 300) {
      errors.notes = "Примітки не можуть перевищувати 300 символів.";
    }
  
    if (Object.keys(errors).length > 0) {
      return { ok: false, errors };
    }
  
    return {
      ok: true,
      errors: {},
      value: {
        tourId: String(input.tourId),
        customerName: name,
        customerPhone: phone,
        customerEmail: email,
        travelersCount,
        needsTransfer,
        notes,
      },
    };
  }