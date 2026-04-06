export const isValidPhone = (phone: string) => /^\d{10}$/.test(phone.trim());

export const isValidName = (name: string) => name.trim().length >= 2;

export const isValidDate = (date: string) => /^\d{4}-\d{2}-\d{2}$/.test(date.trim());

export const isValidTime = (time: string) => /^\d{2}:\d{2}$/.test(time.trim());
