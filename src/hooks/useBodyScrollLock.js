import { useEffect } from 'react';

function useBodyScrollLock() {
  useEffect(() => {
    // Disable scrolling on mount
    document.body.style.overflow = 'hidden';
    
    // Re-enable scrolling on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
}

export default useBodyScrollLock;