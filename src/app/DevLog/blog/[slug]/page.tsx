import { getMDXComponent, useMDXComponent } from 'next-contentlayer/hooks';
import { compareDesc, format, parseISO } from 'date-fns'
import Utterances from '@/components/Utterances';
import { allPosts } from 'contentlayer/generated';




export const generateStaticParams = async () => allPosts.map((post) => ({ slug: post._raw.flattenedPath }))

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const posts = allPosts.sort((a, b) =>
  compareDesc(new Date(a.date), new Date(b.date))
  );
  const post = posts.find((post) => post._raw.flattenedPath === params.slug)
  return { title: post?.title }
}

const PostLayout = async({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)
    const MDXComponent = getMDXComponent(post?.body.code ?? "");
    return (
      <>
      <div className="mt-10 pb-10 border-b-2 mb-10 prose dark:prose-invert">
      <section className="mt-12 mb-10 text-center">
        <h1 className="font-bold text-2xl sm:text-4xl font-mono ">{post?.title}</h1>
      </section>
        <MDXComponent />
      </div>
      {/* <Utterances /> */}
    </>
    );
  };
  
  
  export default PostLayout;



