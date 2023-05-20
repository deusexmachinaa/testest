import TestCard from '@/components/TestCard';
import { supabase } from '@/supabaseClient';
import React from 'react';

export default async function Description() {
  const { data: TestDescriptionItems } = await supabase
    .from('TestDescriptionItems')
    .select()
    .eq('TestItemId', 2)
    .single();
  return (
    <>
      <div className="flex justify-center flex-wrap gap-4 p-8">
        {/* <TestCard title="Statistics" /> */}
        <TestCard title="에임속도 테스트" description={TestDescriptionItems?.Description} />
      </div>
    </>
  );
}
