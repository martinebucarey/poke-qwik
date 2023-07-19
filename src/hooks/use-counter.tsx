import { $, useComputed$, useSignal } from '@builder.io/qwik';

export const useCounter = (initialValue: number) => {
  const counter = useSignal(initialValue);

  const increaseCounter = $(() => {
    counter.value += 1;
  });

  const decreaseCounter = $(() => {
    counter.value -= 1;
  });
  return {
    counter: useComputed$(() => counter.value), // esto se hace para no exponer el counter en el componente que usa el hook con esto queda de solo lectura
    increase: increaseCounter,
    decrease: decreaseCounter,
  };
};
