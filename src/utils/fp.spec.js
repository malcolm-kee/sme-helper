import { compose, forEach, map, reduce } from './fp';

const testArr = [1e12, '139', { id: 123, name: 'wulala' }];

describe('compose', () => {
  const param1 = 12e3;
  const param2 = 'rAndomString';

  test('all fns passed to compose will be invoked', () => {
    const testFn1 = jest.fn();
    const testFn2 = jest.fn();
    const composedFn = compose(testFn1, testFn2);
    composedFn(param1, param2);
    composedFn(param2, param1);
    expect(testFn1.mock.calls.length).toBe(2);
    expect(testFn2.mock.calls.length).toBe(2);
  });

  test('all fns passed to compose will be invokved with similar param', () => {
    const testFn1 = jest.fn();
    const testFn2 = jest.fn();
    const composedFn = compose(testFn1, testFn2);
    composedFn(param1, param2);
    composedFn(param2, param1);
    expect(testFn1.mock.calls).toEqual([[param1, param2], [param2, param1]]);
  });
});

describe('forEach', () => {
  test('it is equivalent to Array.forEach', () => {
    const cbForForEach = jest.fn();
    const cbForArrayForEach = jest.fn();
    forEach(testArr, cbForForEach);
    testArr.forEach(cbForArrayForEach);
    expect(cbForForEach.mock.calls).toEqual(cbForArrayForEach.mock.calls);
  });
});

describe('map', () => {
  test('it is equivalent to Array.map', () => {
    const mapFunction = (elem, index, arr) => `${elem}-${index}-${JSON.stringify(arr)}`;
    const mapResult = map(testArr, mapFunction);
    const arrMapResult = testArr.map(mapFunction);
    expect(mapResult).toEqual(arrMapResult);
  });
});

describe('reduce', () => {
  test('it is equivalent to Array.reduce', () => {
    const reduceFunction = (acc, elem) => `${acc}-${JSON.stringify(elem)}`;
    const reduceResult = reduce(testArr, reduceFunction, '');
    const arrReduceResult = testArr.reduce(reduceFunction, '');
    expect(reduceResult).toEqual(arrReduceResult);
  });
});
