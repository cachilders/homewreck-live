export default ({ subtext }) => (
  <div className="max-w-sm rounded overflow-hidden shadow-lg">
    <img className="w-full" src="/images/sw_logo.jpg" alt="It'll be weird" />
    <div className="px-6 py-4">
      <div className="font-bold text-xl text-center mb-2">Homewreck: Emma</div>
      <p className="text-gray-700 text-base text-center">
        {subtext}
      </p>
    </div>
  </div>
)
