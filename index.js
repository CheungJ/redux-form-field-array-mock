const realArray = [];
let fieldArrayMockName = '';

/* FieldArray methods */
const arrayGet = index => realArray[index];
const arrayPush = (...values) => realArray.push(...values);
const arrayPop = () => realArray.pop();
const arrayShift = () => realArray.shift();
const arrayUnshift = (...values) => realArray.unshift(...values);
const arrayForEach = fn => realArray.forEach(fn);
const arrayRemoveAll = () => (realArray.length = 0);
const arrayInsert = (index, value) => realArray.splice(index, 0, value);
const arrayMap = (value, index) => realArray.map(value, index);
const arrayMove = (from, to) => {
  const value = realArray[from];
  arrayRemove(from);
  arrayInsert(to, value);
};
const arraySwap = (indexA, indexB) => {
  const tempValue = realArray[indexA];
  realArray[indexA] = realArray[indexB];
  realArray[indexB] = tempValue;
};
const arrayRemove = index => {
  realArray.splice(index, 1);
};

/* Mocked FieldArray */
const fieldArrayMock = {
  get: jest.fn().mockImplementation(arrayGet),
  getAll: jest.fn().mockImplementation(() => realArray),
  push: jest.fn().mockImplementation(arrayPush),
  pop: jest.fn().mockImplementation(arrayPop),
  shift: jest.fn().mockImplementation(arrayShift),
  unshift: jest.fn().mockImplementation(arrayUnshift),
  map: jest.fn().mockImplementation(arrayMap),
  forEach: jest.fn().mockImplementation(arrayForEach),
  swap: jest.fn().mockImplementation(arraySwap),
  insert: jest.fn().mockImplementation(arrayInsert),
  remove: jest.fn().mockImplementation(arrayRemove),
  removeAll: jest.fn().mockImplementation(arrayRemoveAll),
  move: jest.fn().mockImplementation(arrayMove),
  _reset: () => (realArray.length = 0)
};

Object.defineProperty(fieldArrayMock, 'name', {
  get: () => fieldArrayMockName,
  set: value => (fieldArrayMockName = value)
});

Object.defineProperty(fieldArrayMock, 'length', {
  get: () => realArray.length
});

export default fieldArrayMock;
