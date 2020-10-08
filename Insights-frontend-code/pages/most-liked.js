import Link from 'next/link'
import { VideoPreview } from '@insights-app/insights-components'
import Layout from '../components/Layout'

export default function MostLiked() {
  return (
    <Layout>
      <main className="py-10 px-10 items-center">
        <h2 className="text-lg font-bold mx-10">Your Most Liked Posts</h2>
        <section className="flex mt-10">
          {[1, 2, 3].map((item) => (
            <section>
              <Link href={`/video/most-liked/${item}`}>
                <a className="p-0">
                  <VideoPreview thumbnailUrl="https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg" />
                </a>
              </Link>
              <section className="flex justify-evenly">
                <button>Delete</button>
                <button>Archive</button>
              </section>
            </section>
          ))}
        </section>
      </main>
    </Layout>
  )
}
