import { EpisodeProps } from "@/interfaces"
import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { GET_EPISODES } from "@/graphql/queries"
import EpisodeCard from "@/components/common/EpisodeCard"

const Home : React.FC= () => {
  const [page, setPage] = useState<number>(1)
  const {loading, error, data, refetch} = useQuery(GET_EPISODES, {
    variables: {
      page: page
    }
  })

  useEffect(() => {
    refetch()
  }, [page, refetch]);

  if(loading) return <h1>Loading...</h1>
  if(error) return <h1>Error</h1>

  const results =  data?.episodes.results;
  const info = data?.episodes.info;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#A3D5E0] to-[#F4F4F4] text-gray-800">
      {/*Header*/}
      <header className="bg-[#4Ca1AF] text-white py-6 text-center shado-md">
        <h1 className="text-4xl font-bold tracking-wide">Ricl And Morty Episodes</h1>4
        <p className="mt-2 text-lg italic">Explore the multiverse of adventures!</p>
      </header>

      {/*Main Conent */}
      <main className="flex-grow p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols4 gap-6">
          {results && results.map(({ id, name, air_date, episode}: EpisodeProps, key: number) => (
            <EpisodeCard
            id={id}
            name={name}
            air_date={air_date}
            episode={episode}
            key={key}
            />
          ))}
        </div>

        {/*PaginationButton*/}
        <div className="flex justify-betwween mt-6">
          <button onClick={() => setPage(prev =>prev > 1 ? prev - 1:1)} className="bg[#45B69C] text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-[#3D9B80] transition duration-200 transform hover:scale-105">
            prev
          </button>
          <button onClick={() => setPage(prev => prev < info.page ? prev + 1 : prev)} className="bg-[#45B69C] text-white font-semibold py-2 px-2 rounded-lg shadow-lg hover:bg-[#3D9B80] transition duration-200 hover:scale-150">
          next
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#4CA1AF] text-white py-4 text-xenter shadow-md">
        <p>&copy; 2025 Rick and Morty Fan Page</p>
      </footer>
    </div>
  )
}

export default Home;