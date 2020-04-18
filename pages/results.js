import fetch from 'isomorphic-unfetch'
import Head from 'next/head'
import ImageCard from './components/ImageCard';

Results.getInitialProps = async ({ req }) => {
  const protocol = req
    ? `${req.headers['x-forwarded-proto'] || 'http'}:`
    : location.protocol
  const host = req ? req.headers['x-forwarded-host'] || req.headers['host'] : location.host
  const res = await fetch(`${protocol}//${host}/api/results`)
  const json = await res.json()
  return json;
}

export default function Results({ error, votingResults }) {
  return (
    <div className="w-full max-w-xs m-auto mt-10">
      <Head>
        <title>Homewreck: Emma - Voting Results</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ImageCard subtext="The results are in!"/>
      <table class="table-auto m-auto mt-10">
        <thead>
          <tr>
            <th class="px-4 py-2">Story</th>
            <th class="px-4 py-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {votingResults.map(({ name, score }) => (
            <tr>
              <td class="border px-4 py-2">{name}</td>
              <td class="border px-4 py-2">{score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
