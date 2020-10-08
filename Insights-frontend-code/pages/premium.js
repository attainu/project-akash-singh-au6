import { Card } from '@insights-app/insights-components'
import Layout from '../components/Layout'

export default function Premium() {
  return (
    <Layout>
      <section className="flex mt-10 justify-center mt-20">
        <h2 className="text-xl">What features you get with our premium?</h2>
      </section>
      <section className="w-auto m-32 sm:flex block sm:justify-around">
        <Card title="vip" price={200}>
          <h2 key="all" className="mt-4">
            Unlimited video uploads
          </h2>
          <h2 key="all">No ads</h2>
        </Card>
        <br />
        <Card title="premium" price={300}>
          <h2 key="all" className="mt-4">
            Unlimited video uploads
          </h2>
          <h2 key="all">No ads</h2>
        </Card>
        <br />
        <Card title="premium+" price={400}>
          <h2 key="all" className="mt-4">
            Unlimited video uploads
          </h2>
          <h2 key="all">No ads</h2>
        </Card>
      </section>
    </Layout>
  )
}
