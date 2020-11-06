import {act, renderHook} from '@testing-library/react-hooks';
import {useStorage, StorageType} from '../storage';

const FIELD_NAME = 'token';

describe('useStorage hook bound to localStorage should be able to', () => {
  const createHook = () => {
    const {result} = renderHook(() => useStorage({field: FIELD_NAME, storageType: StorageType.LocalStorage}))

    return result;
  }

  test('load localStorage value to state', () => {
    const input = 'dori';
    const EXPECTED = input;

    localStorage[FIELD_NAME] = JSON.stringify(input);

    const hook = createHook();
    const [value] = hook.current;

    expect(value).toBe(EXPECTED);
  });

  test('set state and localStorage value when calling setter', () => {
    const input = 'dori';
    const EXPECTED_STATE = input;
    const EXPECTED_LOCAL_STORAGE = JSON.stringify(input);

    const hook = createHook();
    const [, setValue] = hook.current;

    act(() => setValue(input));

    const [value] = hook.current;

    expect(value).toBe(EXPECTED_STATE);
    expect(localStorage[FIELD_NAME]).toBe(EXPECTED_LOCAL_STORAGE);
  });

  test('delete localStorage when calling setter with undefined', () => {
    const input = undefined;

    const hook = createHook();

    const [, setFirstValue] = hook.current;
    act(() => setFirstValue('dori'));

    const [, setSecondValue] = hook.current;
    act(() => setSecondValue(input));

    expect(FIELD_NAME in localStorage).toBe(false);
  });

  afterEach(() => {
    localStorage.clear();
  })
});

// describe('useStorage hook bound to sessionStorage should be able to', () => {
//   const createHook = () => {
//     const {result} = renderHook(() => useStorage<string>({field: FIELD_NAME, storageType: StorageType.SessionStorage}))
//
//     return result;
//   }
//
//   test('load sessionStorage value to state', () => {
//     const input = 'dori';
//     const EXPECTED = input;
//
//     sessionStorage[FIELD_NAME] = JSON.stringify(input);
//
//     const hook = createHook();
//     const [value] = hook.current;
//
//     expect(value).toBe(EXPECTED);
//   });
//
//   test('set state and sessionStorage value when calling setter', () => {
//     const input = 'dori';
//     const EXPECTED_STATE = input;
//     const EXPECTED_LOCAL_STORAGE = JSON.stringify(input);
//
//     const hook = createHook();
//     const [, setValue] = hook.current;
//
//     act(() => setValue(input));
//
//     const [value] = hook.current;
//
//     expect(value).toBe(EXPECTED_STATE);
//     expect(sessionStorage[FIELD_NAME]).toBe(EXPECTED_LOCAL_STORAGE);
//   });
//
//   test('delete sessionStorage when calling setter with undefined', () => {
//     const input = undefined;
//
//     const hook = createHook();
//
//     const [, setFirstValue] = hook.current;
//     act(() => setFirstValue('dori'));
//
//     const [, setSecondValue] = hook.current;
//     act(() => setSecondValue(input));
//
//     expect(FIELD_NAME in sessionStorage).toBe(false);
//   });
//
//   afterEach(() => {
//     sessionStorage.clear();
//   })
// });