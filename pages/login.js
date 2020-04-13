export default () => (
  <div className="w-full max-w-xs m-auto mt-10">
    <form className="bg-gray-100 border shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
          Email
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Email" />
      </div>
      <div class="flex items-center justify-between">
        <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline" type="button">
          Get Wrecked
        </button>
      </div>
    </form>
  </div>
)
