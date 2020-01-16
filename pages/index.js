import { attributes, react as HomeContent } from '../content/home.md';
import Link from 'next/link';
import Layout from '../src/components/Layout';

const Home = () => {
  const { title, cats } = attributes;
  return (
    <Layout>
      <Link href="/blog">
        <a>blog</a>
      </Link>

      <article>
        <h1>{title}</h1>
        <HomeContent />
        <ul>
          {cats.map((cat, k) => (
            <li key={k}>
              <h2>{cat.name}</h2>
              <p>{cat.description}</p>
            </li>
          ))}
        </ul>
      </article>
    </Layout>
  )
};
export default Home
