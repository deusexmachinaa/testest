import Head from "next/head";

export default function PsychologicalTest() {
  const content = (
    <div>
      <h1>심리테스트</h1>
      <p>이 페이지에서는 심리테스트에 관한 내용을 제공합니다.</p>
    </div>
  );

  return (
    <div>
      <Head>
        <title>심리테스트</title>
      </Head>
      {content}
    </div>
  );
}
