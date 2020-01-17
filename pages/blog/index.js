import { useState } from 'react';
import Layout from '../../src/components/Layout';
import Link from 'next/link';

const importBlogPosts = async () => {
  // https://webpack.js.org/guides/dependency-management/#requirecontext
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

const importCategories = async () => {
  const mdFiles = require
    .context('../../content/categories', false, /\.md$/)
    .keys()
    .map((relativePath) => relativePath.substring(2))

  return Promise.all(
    mdFiles.map(async (path) => {
      const md = await import(`../../content/categories/${path}`);
      return { ...md, slug: path.substring(0, path.length -3)}
    })
  )
};

const Blog = ({ postsList, categoriesList }) => {
  const [filter, setFilter] = useState('all');

  const renderButtons = () => {

    return categoriesList.map(({ attributes: { title }}) => (
      <button key={title} data-filter={title} onClick={handleButtonClick}>
        {`Category: ${title}`}
      </button>
    ));
  };

  const handleButtonClick = (ev) => {
    setFilter(ev.target.dataset.filter);
  };

  const renderPostList = () => postsList
    .filter((item) => filter === 'all' || item.attributes.category === filter)
    .map((post) => (
    <div key={post.slug}>
      <Link href="/blog/post/[slug]" as={`/blog/post/${post.slug}`}>
        <a>{post.attributes.title}</a>
      </Link>
    </div>
  ));

  return (
    <Layout>
      <div>
        <button data-filter="all" onClick={handleButtonClick}>
          All
        </button>
        {renderButtons()}
      </div>
      <div>
        {renderPostList()}
      </div>
    </Layout>
  );
};

Blog.getInitialProps = async () => {
  const postsList = await importBlogPosts();
  const categoriesList = await importCategories();
  return { postsList, categoriesList }
};



export default Blog;