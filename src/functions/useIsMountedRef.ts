import { useRef, useEffect } from "react";

export default function useIsMountedRef(){
  const isMountedRef = useRef(null as any);
  useEffect(() => {
    isMountedRef.current = true;
    return ()=> { isMountedRef.current = false };
  });
  return isMountedRef;
}