import { supabase } from '@/supabaseClient';
import { useQuery } from '@tanstack/react-query';

function useCandidates() {
  const fetchItems = async () => {
    const { data: Candidates } = await supabase.from('Candidates').select();
    return Candidates;
  };

  const { data: candidates, isLoading, isError } = useQuery(['Candidates'], fetchItems);

  return { candidates, isLoading, isError };
}

export default useCandidates;
