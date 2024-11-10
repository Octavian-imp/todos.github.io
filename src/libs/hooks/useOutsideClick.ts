import { RefObject, useEffect } from "react";
import { useEvent } from "./useEvent";


type UseOutsideClickOptions = {
  elementRef: RefObject<HTMLElement>
  triggerRef?: RefObject<HTMLElement>
  enabled?: boolean
  onOutsideClick(e: MouseEvent | TouchEvent): void
}

export function useOutsideClick({ elementRef, enabled = true, triggerRef, onOutsideClick }: UseOutsideClickOptions) {

  const handleOutsideClick = useEvent(onOutsideClick)

  useEffect(() => {
    if (!enabled) {
      return
    }
    const handleClick = (e: MouseEvent | TouchEvent) => {
      const { target } = e
      
      if (!(e.target instanceof Node)) {
        return
      }
      if (!elementRef.current) {
        return
      }

      const ignoreElements = [elementRef.current]

      if (triggerRef?.current) {
        ignoreElements.push(triggerRef.current)
      }

      if (!ignoreElements.some(el => el.contains(target as Node | null))) {
        handleOutsideClick(e)
      }
    }

    document.addEventListener("touchstart", handleClick)
    document.addEventListener("mousedown", handleClick)

    return () => {
      document.addEventListener("touchstart", handleClick)
      document.addEventListener("mousedown", handleClick)
    }
  }, [elementRef, triggerRef, enabled, handleOutsideClick]);
}