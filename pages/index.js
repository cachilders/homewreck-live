import Head from 'next/head';
import ImageCard from './components/ImageCard';

Index.getInitialProps = async ({ query }) => {
  return { error: query.error };
};

function Index({ error }) {
  let errorMessage = error ? (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-3 py-4 mb-3 rounded relative text-center"
      role="alert"
    >
      <span className="block sm:inline">{error}</span>
    </div>
  ) : null;

  return (
    <div className="w-full max-w-xs m-auto mt-10 p-4">
      <Head>
        <title>Homewreck: Dracula - Login to vote</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ImageCard subtext={'Identify yourself'} />
      <div className="mt-10">
        {errorMessage}
        <form
          className="bg-gray-100 border shadow-md rounded px-8 pt-6 pb-8 mb-4"
          action="/api/login"
          method="post"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="flex items-center justify-between">
            <input
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
              type="submit"
              value="Start Voting"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Index;
