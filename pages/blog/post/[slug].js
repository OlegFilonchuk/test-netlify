import Layout from '../../../src/components/Layout';

const Post = ({ blogpost }) => {
  if (!blogpost) return <div>not found</div>;

  const { attributes, react: Content} = blogpost.default;

  return (
    <Layout>
      <div>
        <h1>{attributes.title}</h1>
        <Content/>
      </div>
    </Layout>
  );
};

Post.getInitialProps = async ({ query }) => {
  const { slug } = query;
  const blogpost = await import(`../../../content/blogPosts/${slug}.md`).catch(() => null);
  return { blogpost }
};

export default Post;