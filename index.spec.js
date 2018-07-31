import mockFieldArray, { restoreFieldArrayMock } from './index';

describe('Given a mockFieldArray', () => {
  afterEach(() => mockFieldArray._reset());

  describe('when `get` is called', () => {
    beforeEach(() => mockFieldArray.push(1, 2, 3));

    it('should get the value at the index', () => {
      expect(mockFieldArray.get(1)).toBe(2);
    });
  });

  describe('when `push` is called', () => {
    it('should add a value to the array', () => {
      mockFieldArray.push(123);
      expect(mockFieldArray.get(0)).toBe(123);
    });

    it('should add multiple values to the array', () => {
      mockFieldArray.push(1, 2, 3);
      expect(mockFieldArray.getAll()).toEqual([1, 2, 3]);
    });
  });

  describe('when `pop` is called', () => {
    beforeEach(() => mockFieldArray.push(1, 2, 3));

    it('should return the last value in the array', () => {
      expect(mockFieldArray.pop()).toBe(3);
    });

    it('should remove the last value', () => {
      mockFieldArray.pop();
      expect(mockFieldArray.getAll()).toEqual([1, 2]);
    });
  });

  describe('when `shift` is called', () => {
    beforeEach(() => mockFieldArray.push(1, 2, 3));

    it('should return the first value in the array', () => {
      expect(mockFieldArray.shift()).toBe(1);
    });

    it('should remove the first value', () => {
      mockFieldArray.shift();
      expect(mockFieldArray.getAll()).toEqual([2, 3]);
    });
  });

  describe('when `unshift` is called', () => {
    beforeEach(() => mockFieldArray.push(3, 4, 5));

    it('should add a value to the beginning of the array', () => {
      mockFieldArray.unshift(2);
      expect(mockFieldArray.getAll()).toEqual([2, 3, 4, 5]);
    });

    it('should add multiple values to the beginning of the array', () => {
      mockFieldArray.unshift(1, 2);
      expect(mockFieldArray.getAll()).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('when `forEach` is called', () => {
    beforeEach(() => mockFieldArray.push('foo', 'bar', 'baz'));

    it('should iterate through the array', () => {
      const fn = jest.fn();
      mockFieldArray.forEach(fn);

      expect(fn.mock.calls.length).toBe(3);
      expect(fn.mock.calls[0]).toEqual(['foo', 0, ['foo', 'bar', 'baz']]);
      expect(fn.mock.calls[1]).toEqual(['bar', 1, ['foo', 'bar', 'baz']]);
      expect(fn.mock.calls[2]).toEqual(['baz', 2, ['foo', 'bar', 'baz']]);
    });
  });

  describe('when `removeAll` is called', () => {
    beforeEach(() => mockFieldArray.push(1, 2, 3));

    it('should empty the array', () => {
      mockFieldArray.removeAll();
      expect(mockFieldArray.getAll()).toEqual([]);
    });
  });

  describe('when `insert` is called', () => {
    describe('and when the array is empty', () => {
      beforeEach(() => mockFieldArray._reset());

      it('should insert a new value in the first index', () => {
        mockFieldArray.insert(123, 1);
        expect(mockFieldArray.get(0)).toBe(1);
      });
    });

    describe('and when values exist in the array', () => {
      beforeEach(() => {
        mockFieldArray.push(1, 2, 4);
      });

      it('should insert a new value into the index position', () => {
        mockFieldArray.insert(2, 3);
        expect(mockFieldArray.getAll()).toEqual([1, 2, 3, 4]);
      });
    });
  });

  describe('when `map` is called', () => {
    const double = value => value * 2;

    beforeEach(() => mockFieldArray.push(1, 2, 3));

    it('should apply the mapping function to the array', () => {
      expect(mockFieldArray.map(double)).toEqual([2, 4, 6]);
    });
  });

  describe('when `swap` is called', () => {
    beforeEach(() => mockFieldArray.push(2, 1));

    it('should swap the values', () => {
      mockFieldArray.swap(0, 1);
      expect(mockFieldArray.getAll()).toEqual([1, 2]);
    });
  });

  describe('when `move` is called', () => {
    beforeEach(() => mockFieldArray.push(2, 1, 3));

    it('should move the position of the value in array', () => {
      mockFieldArray.move(1, 0);

      expect(mockFieldArray.getAll()).toEqual([1, 2, 3]);
    });
  });

  describe('when `remove` is called', () => {
    beforeEach(() => mockFieldArray.push(1, 2, 3));

    it('should remove the value at the index', () => {
      mockFieldArray.remove(1);

      expect(mockFieldArray.getAll()).toEqual([1, 3]);
    });
  });

  describe('when `removeAll` is called', () => {
    beforeEach(() => mockFieldArray.push(1, 2, 3));

    it('should remove all values from the array', () => {
      mockFieldArray.removeAll();

      expect(mockFieldArray.getAll()).toEqual([]);
    });
  });

  describe('when using the name property', () => {
    it('should be an empty string by default', () => {
      expect(mockFieldArray.name).toBe('');
    });

    describe('and changing the name', () => {
      beforeEach(() => (mockFieldArray.name = 'new name'));

      it('should have a new name', () => {
        expect(mockFieldArray.name).toBe('new name');
      });
    });
  });

  describe('when checking the length of the array', () => {
    beforeEach(() => mockFieldArray.push(1, 2, 3));

    it('should return the correct length', () => {
      expect(mockFieldArray.length).toBe(3);
    });
  });
});
