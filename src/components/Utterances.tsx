import { memo } from 'react';

function Utterances() {
  return (
    <section
      ref={(elem) => {
        if (!elem) return;
        const scriptElement = document.createElement('script');
        scriptElement.src = 'https://utteranc.es/client.js';
        scriptElement.async = true;
        scriptElement.setAttribute('repo', '본인의 utterances 레포지토리');
        scriptElement.setAttribute('issue-term', '댓글을 어떻게 관리할 것인지');
        scriptElement.setAttribute('theme', '원하는 테마');
        scriptElement.setAttribute('crossorigin', 'anonymous');
        elem.appendChild(scriptElement);
      }}
    />
  );
}

export default memo(Utterances);