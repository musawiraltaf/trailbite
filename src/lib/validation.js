// Checkout form validation (FR10) plus the rule checks that must pass before an
// order can be placed (FR12). Returns an object of field -> message; an empty
// object means the form is valid.
import { checkAgeEligibility, checkServiceArea } from '../rules/businessRules.js'

export const CITY_OPTIONS = ['Islamabad', 'Rawalpindi', 'Lahore', 'Peshawar', 'Karachi', 'Other']
export const DELIVERY_SLOTS = ['Morning (9am – 12pm)', 'Afternoon (12pm – 4pm)', 'Evening (4pm – 8pm)']

export const EMPTY_FORM = {
  fullName: '',
  phone: '',
  city: '',
  address: '',
  slot: '',
  dateOfBirth: '',
  notes: '',
}

/** Today's date as 'YYYY-MM-DD' in the customer's local time zone. */
export function todayISO() {
  const now = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

/** Removes spaces and dashes so "0300-123 4567" and "03001234567" are treated the same. */
export function normalisePhone(phone) {
  return phone.replace(/[\s-]/g, '')
}

/**
 * @param {object} form current form values
 * @param {object} context
 * @param {Array}  context.lines  cart lines [{ product, quantity }]
 * @param {string} context.today  'YYYY-MM-DD'
 */
export function validateCheckout(form, { lines, today }) {
  const errors = {}
  const name = form.fullName.trim()

  // 1. Name: at least two words of letters, so the rider knows who to ask for.
  if (!name) errors.fullName = 'Enter your full name.'
  else if (!/^[A-Za-z][A-Za-z .'-]*$/.test(name)) errors.fullName = 'Use letters only (spaces, dots and hyphens are fine).'
  else if (name.split(/\s+/).length < 2) errors.fullName = 'Enter your first and last name.'

  // 2. Phone: Pakistani mobile number, 11 digits starting with 03.
  const phone = normalisePhone(form.phone)
  if (!phone) errors.phone = 'Enter a mobile number so the rider can call you.'
  else if (!/^03\d{9}$/.test(phone)) errors.phone = 'Enter an 11-digit mobile number starting with 03, e.g. 0300 1234567.'

  // 3. City: Rule 3 (service area).
  if (!form.city) errors.city = 'Choose your city.'
  else {
    const area = checkServiceArea(form.city)
    if (!area.ok) errors.city = area.message
  }

  // 4. Address: long enough to find the house.
  if (form.address.trim().length < 10) errors.address = 'Enter your house, street and sector (at least 10 characters).'

  // 5. Delivery slot.
  if (!form.slot) errors.slot = 'Choose a delivery time.'

  // 6. Date of birth: Rule 2, only when the cart has an 18+ item.
  const products = lines.map((line) => line.product)
  const age = checkAgeEligibility(products, form.dateOfBirth, today)
  if (!age.ok) errors.dateOfBirth = age.message

  return errors
}
