// https://www.youtube.com/watch?v=0c6znExIqRw
import { useRef, useEffect, useCallback } from 'react';

export const useTimeout = (callback:Function, delay:number) => {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<any>();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback])

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay)
  }, [delay])

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current)
  }, [])

  useEffect(() => {
    set()
    return clear()
  }, [delay, set, clear])

  const reset = useCallback(() => {
    clear()
    set()
  }, [clear, set])

  return { reset, clear }
}