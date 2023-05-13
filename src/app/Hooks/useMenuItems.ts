import { supabase } from '@/supabaseClient';
import { useQuery } from '@tanstack/react-query';

function useMenuItems() {
  const fetchItems = async () => {
    const { data: MenuItems } = await supabase.from('MenuItems').select();
    return MenuItems;
  };

  const { data: menuItems, isLoading, isError } = useQuery(['menuItems'], fetchItems);

  return { menuItems, isLoading, isError };
}

export default useMenuItems;
