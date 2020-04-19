import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import ImageCard from './components/ImageCard';

Results.getInitialProps = async ({ req }) => {
  const protocol = req
    ? `${req.headers['x-forwarded-proto'] || 'http'}:`
    : location.protocol;
  const host = req
    ? req.headers['x-forwarded-host'] || req.headers['host']
    : location.host;
  const res = await fetch(`${protocol}//${host}/api/results`);
  const json = await res.json();
  return json;
};

export default function Results({ votingResults, voteStats }) {
  return (
    <div className="w-full max-w-xs m-auto mt-10">
      <Head>
        <title>Homewreck: Emma - Voting Results</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ImageCard subtext="The results are in!" />
      <div className="px-8 pt-8 mb-4">
        <p className="text-gray-700 text-base text-center">
          <div>Total Votes: {voteStats.total_votes}</div>
          <div>Remaining Votes: {voteStats.remaining_votes}</div>
        </p>
      </div>
      <table className="table-auto m-auto mt-10">
        <thead>
          <tr>
            <th className="px-4 py-2">Story</th>
            <th className="px-4 py-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {votingResults.map(({ name, score }, i) => {
            const className = i % 2 > 0 ? 'bg-gray-100' : null;
            return (
              <tr className={className}>
                <td className="border px-4 py-2">{name}</td>
                <td className="border px-4 py-2">{score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
