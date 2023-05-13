import { supabase } from '@/supabaseClient';
import { useQuery } from '@tanstack/react-query';

function useTestItems() {
  const fetchItems = async () => {
    const { data: TestItems } = await supabase.from('TestItems').select();
    return TestItems;
  };

  const { data: testItems, isLoading, isError } = useQuery(['tesItems'], fetchItems);

  return { testItems, isLoading, isError };
}

export default useTestItems;
