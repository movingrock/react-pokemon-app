import { useEffect } from "react";

export default function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      console.log(event.target)
      // 값이 없거나 안쪽을 클릭하고 있으면 return
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      // 그렇지 않으면(바깥쪽을 누르면) handler (modal을 false로 하는)
      handler()
    }
    document.addEventListener('mousedown', listener)
  
    return () => {
      document.removeEventListener('mousedown', listener)
    }
  }, [ref, handler])
  
}