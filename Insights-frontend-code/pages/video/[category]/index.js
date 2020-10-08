import { useRouter } from 'next/router'
import Link from 'next/link'
import { VideoPreview } from '@insights-app/insights-components'
import Layout from '../../../components/Layout'

export default function CategoryPage() {
  const router = useRouter()
  const { category } = router.query
  return (
    <Layout>
      <main className="py-10 px-10">
        <section className="flex justify-between" key={category}>
          <h1 className="font-extrabold font-sans text-2xl">{category}</h1>
        </section>
        <section className="w-auto mx-10">
          {[1, 2].map((item) => (
            <section className="sm:flex justify-center">
              {[1, 2, 3].map((item) => (
                <Link href={`/video/${item}`}>
                  <a>
                    <VideoPreview thumbnailUrl="https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg" />
                  </a>
                </Link>
              ))}
            </section>
          ))}
        </section>
      </main>
    </Layout>
  )
}
