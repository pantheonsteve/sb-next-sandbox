import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedMarkdownData } from '../lib/static/markdown';
import Link from 'next/link';
import Date from '../components/date';
// Contentful imports
import Container from '../components/container';
import MoreStories from '../components/more-stories';
import HeroPost from '../components/hero-post';
import Intro from '../components/intro';
import { getAllPostsForHome } from '../lib/contentful/api';
import { CMS_NAME } from '../lib/contentful/constants';

export async function getStaticProps({ preview = false }) {
  const allMarkdownData = getSortedMarkdownData();
  const allPosts = (await getAllPostsForHome(preview)) ?? []
  return {
    props: {
      allMarkdownData,
      preview,
      allPosts,
    },
  };
}

export default function Home({ allMarkdownData, allPosts, preview }) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1)
  return (
    <Layout home preview={preview}>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Contentful Posts</h2>
        <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
        </Container>
      </section>

           <section className={utilStyles.headingMd}>
        <p>My name is Steve Bresnick. I'm a Sales Engineer, Web Developer, Educator, and Instructional Designer.</p>
        <p>
          This is my sample website using NextJS and various other data sources.
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Static Blog Posts (Markdown)</h2>
        <ul className={utilStyles.list}>
          {allMarkdownData.map(({ id, date, title }) => (
             <li className={utilStyles.listItem} key={id}>
              <Link href={`/markdown/${id}`}>{title}</Link>
              <br />
              {id}
              <br />
              <Date dateString={date} />
             </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}