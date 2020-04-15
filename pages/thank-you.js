import ImageCard from './components/ImageCard';

export default () => (
  <div className="w-full max-w-xs m-auto mt-10">
    <Head>
      <title>Homewreck: Emma - Your vote has been counted</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <ImageCard subtext={'Let\'s not wreck this home any more. Thanks for the votes!'} />
  </div>
)
