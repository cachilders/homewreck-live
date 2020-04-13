import fetch from 'isomorphic-unfetch'

const chevron = <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>

Ballot.getInitialProps = async ({ req }) => {
  const protocol = req
    ? `${req.headers['x-forwarded-proto'] || req.headers['referer'].match(/https?/)[0]}:`
    : location.protocol
  const host = req ? req.headers['x-forwarded-host'] || req.headers['host'] : location.host
  const res = await fetch(`${protocol}//${host}/api/ballot`)
  const json = await res.json()
  return json
}

function Ballot({stories}) {
  const options = stories.map(({ id, name }) => <option key={id}>{name}</option>)

  return (
    <div className="w-full max-w-xs m-auto mt-10">
      <form className="bg-gray-100 border shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first">
            Most Favorite
          </label>
          <div className="inline-block relative w-64">
            <select defaultValue=" " id="first" className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
              <option disabled> </option>
              {options}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              {chevron}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="second">
            Second Most Favorite
          </label>
          <div className="inline-block relative w-64">
            <select defaultValue=" " id="second" className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
              <option disabled> </option>
              {options}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              {chevron}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="third">
            Third Most Favorite
          </label>
          <div className="inline-block relative w-64">
            <select defaultValue=" " id="third" className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
              <option disabled> </option>
              {options}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              {chevron}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline" type="button">
            Cast
          </button>
        </div>
      </form>
    </div>
  )
}

export default Ballot;
