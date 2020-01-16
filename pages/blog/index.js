import Layout from '../../src/components/Layout';
import Link from 'next/link';

const importBlogPosts = async () => {
  const mdFiles = require
    .context('../../content/blogPosts', false, /\.md$/)
    .keys()
    .map((relativePath) => relativePath.substring(2));

  return Promise.all(
    mdFiles.map(async path => {
      const md = await import(`../../content/blogPosts/${path}`);
      return { ...md, slug: path.substring(0, path.length - 3)}
    })
  )
};

const Blog = ({ postsList }) => {
  return (
    <Layout>
      <div>
        {postsList.map((post) => (
          <div key={post.slug}>
            <Link href="/blog/post/[slug]" as={`/blog/post/${post.slug}`}>
              <a>{post.attributes.title}</a>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
};

Blog.getInitialProps = async () => {
  const postsList = await importBlogPosts();
  return { postsList }
};



export default Blog;