import { useEffect } from 'react';
import { useSidebarUpdateLink } from '../contexts/SidebarContext';

export const useSetLink = (link:string) => {
  const setLink = useSidebarUpdateLink();
  useEffect(() => {
    setLink(link);
  }, [])
}