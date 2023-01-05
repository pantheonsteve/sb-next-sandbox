import Layout from "../../components/layout";
import { getAllMarkdownIds, getMarkdownData } from '../../lib/static/markdown';
import Head from "next/head";
import Date from '../../components/date';

export async function getStaticProps({ params }) {
    // Add the "await" keyword like this:
    const markdownData = await getMarkdownData(params.id);

    return {
        props: {
            markdownData,
        },
    };
}

export async function getStaticPaths() {
    const paths = getAllMarkdownIds();
    return {
        paths,
        fallback: false,
    };
}

export default function Markdown({ markdownData }) {
    return (
      <Layout>
        <Head>
            <title>{markdownData.title}</title>
        </Head>
        {markdownData.title}
        <br />
        {markdownData.id}
        <br />
        <Date dateString={markdownData.date} />
        <br />
        <div dangerouslySetInnerHTML={{ __html: markdownData.contentHtml }} />
      </Layout>
    );
  }