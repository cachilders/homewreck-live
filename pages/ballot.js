import fetch from 'isomorphic-unfetch'
import Router from 'next/router'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import ImageCard from './components/ImageCard';

Ballot.getInitialProps = async ({ req, query }) => {
  const id = query && query.shipster
  if (id) {
    const protocol = req
      ? `${req.headers['x-forwarded-proto'] || 'http'}:`
      : location.protocol
    const host = req ? req.headers['x-forwarded-host'] || req.headers['host'] : location.host
    const res = await fetch(`${protocol}//${host}/api/ballot?id=${id}`)
    const json = await res.json()
  
    return {
      protocol,
      host,
      ...json,
    }
  }
  return {}
}

const defaultBallot = { first: '', second: '', third: '', multiplier: 1 }
const chevron = (
  <svg
    className="fill-current h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20">
    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
  </svg>
)

function Ballot({stories = [], voter = {}, protocol, host}) {
  const { id: voterId, total_votes: totalVotes, votes_made: votesMade } = voter
  const [votes, setVotes] = useState(defaultBallot)
  const [maxVotes, setMaxVotes] = useState(totalVotes - votesMade)
  const { first, second, third, multiplier } = votes;
  const selected = Object.values(votes);
  const voteDisabled = selected.includes('');
  const handleSelect = ({target: { id, value } }) => setVotes({ ...votes, [id]: value})
  const options = stories.map(({ id, name }) => (
    <option key={id} value={id} disabled={selected.includes(id.toString())}>{name}</option>
  ))
  const castVote = async () => {
    const res = await fetch(`${protocol}//${host}/api/vote`, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify({
        voterId,
        votes: { first, second, third, multiplier },
      })
    })

    if (res.status === 200) {
      const nextVotes = maxVotes - multiplier
      if (nextVotes < 1) Router.push('/thank-you')
      setVotes(defaultBallot)
      setMaxVotes(nextVotes)
    }
  }
  
  useEffect(() => {
    if (!voter.id) Router.push('/')
    if (maxVotes < 1) Router.push('/thank-you')
  });

  return (
    <div className="w-full max-w-xs m-auto mt-10">
      <Head>
        <title>Homewreck: Emma - Your ballot</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ImageCard subtext={`OK. Listen. You bought ${totalVotes} votes, and you've got ${maxVotes} remaining.`} />
      <div className="mt-10">
        <form className="bg-gray-100 border shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first">
              Most Favorite
            </label>
            <div className="inline-block relative w-64">
              <select
                value={first} onChange={handleSelect}
                id="first"
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              >
                <option disabled value='' />
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
              <select
                value={second}
                onChange={handleSelect}
                id="second"
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              >
                <option disabled value='' />
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
              <select
                value={third}
                onChange={handleSelect}
                id="third"
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              >
                <option disabled value='' />
                {options}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                {chevron}
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="third">
              Number of votes to use on this ballot
            </label>
            <div className="inline-block relative w-64">
              <select
                value={multiplier}
                onChange={handleSelect}
                id="multiplier"
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              >
                {maxVotes && Array.from(Array(maxVotes).keys()).map((v) => <option value={v+1}>{v+1}</option>)}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                {chevron}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className={`${voteDisabled ? 'bg-gray-500' : 'bg-red-500 hover:bg-red-600'} text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline`}
              type="button"
              onClick={castVote}
              disabled={voteDisabled}
            >
              Cast it!
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Ballot;
