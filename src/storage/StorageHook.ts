import {storages, StorageType} from './Storages';
import {Dispatch, SetStateAction, useState} from 'react';

export interface StorageHookProps {
  field: string;
  storageType?: StorageType;
}

export type StorageHook<T> = [
  T | undefined,
  Dispatch<(SetStateAction<T | undefined> | undefined)>
]

const defaultProps = {
  storageType: StorageType.LocalStorage
}

export const useStorage = <T>(props: StorageHookProps): StorageHook<T> => {
  const {
    field,
    storageType
  } = {...props, ...defaultProps};

  const storage = storages[storageType];

  const [stateValue, setStateValue] = useState<T | undefined>(() => {
    const rawValue = storage[field];

    return rawValue ? JSON.parse(rawValue) : undefined;
  });

  const setLocalStorageValue = (value?: T) => {
    if (value === undefined) {
      delete storage[field];
    } else {
      storage[field] = JSON.stringify(value);
    }
  }

  const setValue: Dispatch<SetStateAction<T | undefined> | undefined> = (value) => {
    if (!value) {
      setLocalStorageValue();
      setStateValue(undefined);

      return;
    }

    const newValue = value instanceof Function ? value(stateValue) : value;

    setLocalStorageValue(newValue);
    setStateValue(newValue);
  };

  return [stateValue, setValue];
};