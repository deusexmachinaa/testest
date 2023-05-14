import { supabase } from '@/supabaseClient';
import { useQuery } from '@tanstack/react-query';

function useVersusItems() {
  const fetchItems = async () => {
    const { data: VersusItems } = await supabase.from('VersusItems').select();
    return VersusItems;
  };

  const { data: VersusItems, isLoading, isError } = useQuery(['VersusItems'], fetchItems);

  return { VersusItems, isLoading, isError };
}

export default useVersusItems;
