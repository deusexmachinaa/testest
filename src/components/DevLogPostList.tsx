import { Post } from 'contentlayer/generated';
import DevlogPost from './DevLogPost';


export default function DevLogPostList( { posts }: { posts: Post[]} ) {
  console.log(posts);
  return (
    <div className="flex flex-col">
      {posts.map((post, idx) => (
        <DevlogPost
          date={post.date}
          title={post.title}
          des={post.description}
          slug={post._raw.flattenedPath}
          key={post._id}
        />
      ))}
    </div>
  );
}