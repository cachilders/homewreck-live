import Head from 'next/head';
import ImageCard from './components/ImageCard';

export default () => (
  <div className="w-full max-w-xs m-auto mt-10">
    <Head>
      <title>Homewreck: Dracula - Your vote has been counted</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <ImageCard
      subtext={`Thanks for your votes! That\'s all we\'ve got for you. Seriously, thank you. We know there are plenty of other conference calls you could\'ve been on.`}
    />
  </div>
);
