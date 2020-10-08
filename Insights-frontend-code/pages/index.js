import { VideoPreview } from '@insights-app/insights-components'
import Link from 'next/link'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout>
      <main className="py-10 px-10">
        {['Trending', 'Recommended', 'Latest', 'Popular'].map((category) => (
          <>
            <section className="flex justify-between" key={category}>
              <h1 className="font-extrabold font-sans text-2xl">{category}</h1>
              <section>
                <Link href={`/video/${category.toLowerCase()}`}>
                  <a className="h-4">
                    <img
                      src="https://www.flaticon.com/svg/static/icons/svg/50/50621.svg"
                      alt="viewmore"
                      className="opacity-25 cursor-pointer w-4 hover:opacity-100"
                    />
                  </a>
                </Link>
              </section>
            </section>
            <section className="flex w-auto overflow-x-scroll overflow-y-hidden whitespace-no-wrap mx-10">
              {[1, 2].map((item) => (
                <section className="flex justify-center mb-10">
                  {[1, 2, 3].map((item) => (
                    <Link href={`/video/${category.toLowerCase()}/${item}`}>
                      <a className="p-0">
                        <VideoPreview thumbnailUrl="https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg" />
                      </a>
                    </Link>
                  ))}
                </section>
              ))}
            </section>
          </>
        ))}
      </main>
    </Layout>
  )
}
