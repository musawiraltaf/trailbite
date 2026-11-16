// Run with: npm test   (which runs `node --test`)
// Tests the same functions the React app imports from src/rules/businessRules.js.
import test from 'node:test'
import assert from 'node:assert/strict'
import {
  checkQuantity,
  getMaxQuantity,
  MAX_PER_PRODUCT,
  checkAgeEligibility,
  getDeliveryFee,
  amountToFreeDelivery,
  checkServiceArea,
  findCartIssues,
} from '../src/rules/businessRules.js'

// --- Rule 1: quantity limit (the rule required by Task 6.2) -----------------
const wellStocked = { id: 'a', stock: 18 }
const lowStock = { id: 'b', stock: 2 }
const soldOut = { id: 'c', stock: 0 }

test('Rule 1: an ordinary quantity is accepted', () => {
  assert.equal(checkQuantity(wellStocked, 2).ok, true)
})

test('Rule 1: exactly the per-order limit is accepted', () => {
  assert.equal(MAX_PER_PRODUCT, 5)
  assert.equal(checkQuantity(wellStocked, 5).ok, true)
})

test('Rule 1: one above the per-order limit is rejected with a message', () => {
  const result = checkQuantity(wellStocked, 6)
  assert.equal(result.ok, false)
  assert.equal(result.max, 5)
  assert.match(result.message, /up to 5/)
})

test('Rule 1: stock caps the limit when fewer than 5 are left', () => {
  assert.equal(getMaxQuantity(lowStock), 2)
  assert.equal(checkQuantity(lowStock, 2).ok, true)
  assert.equal(checkQuantity(lowStock, 3).ok, false)
})

test('Rule 1: out-of-stock and zero quantities are rejected', () => {
  assert.equal(checkQuantity(soldOut, 1).ok, false)
  assert.equal(checkQuantity(wellStocked, 0).ok, false)
})

// --- Rule 1 applied to a restored (saved) cart -------------------------------
test('Rule 1: a saved cart within current stock has no issues', () => {
  assert.deepEqual(findCartIssues([{ id: 'a', quantity: 5 }], [wellStocked]), [])
})

test('Rule 1: a saved quantity above new stock is lowered to the stock', () => {
  const [issue] = findCartIssues([{ id: 'b', quantity: 4 }], [lowStock])
  assert.equal(issue.kind, 'over-stock')
  assert.equal(issue.fixQuantity, 2)
})

test('Rule 1: sold-out and discontinued saved items are flagged for removal', () => {
  const issues = findCartIssues(
    [
      { id: 'c', quantity: 1 },
      { id: 'gone', quantity: 2 },
    ],
    [soldOut],
  )
  assert.deepEqual(
    issues.map(({ kind, fixQuantity }) => ({ kind, fixQuantity })),
    [
      { kind: 'sold-out', fixQuantity: 0 },
      { kind: 'discontinued', fixQuantity: 0 },
    ],
  )
})

// --- Rule 2: age eligibility ----------------------------------------------
const knife = { name: 'Folding Camp Knife', ageRestricted: true }
const oats = { name: 'Honey Almond Oats', ageRestricted: false }

test('Rule 2: no restricted items means no age check', () => {
  assert.equal(checkAgeEligibility([oats], '', '2026-11-16').ok, true)
})

test('Rule 2: customer turning 18 today is accepted (boundary)', () => {
  assert.equal(checkAgeEligibility([oats, knife], '2008-11-16', '2026-11-16').ok, true)
})

test('Rule 2: customer turning 18 tomorrow is rejected', () => {
  const result = checkAgeEligibility([knife], '2008-11-17', '2026-11-16')
  assert.equal(result.ok, false)
  assert.match(result.message, /18 or older/)
})

// --- Rule 3: delivery fee and service area ---------------------------------
test('Rule 3: Rs 1,999 pays the Rs 150 delivery fee', () => {
  assert.equal(getDeliveryFee(1999), 150)
  assert.equal(amountToFreeDelivery(1999), 1)
})

test('Rule 3: exactly Rs 2,000 gets free delivery (boundary)', () => {
  assert.equal(getDeliveryFee(2000), 0)
  assert.equal(amountToFreeDelivery(2000), 0)
})

test('Rule 3: only Islamabad and Rawalpindi are served', () => {
  assert.equal(checkServiceArea('Rawalpindi').ok, true)
  assert.equal(checkServiceArea('Lahore').ok, false)
})
