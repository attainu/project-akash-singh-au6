import { useRouter } from 'next/router'
import {
  VideoMain,
  CommentBox,
  CommentSection,
} from '@insights-app/insights-components'
import Layout from '../../../components/Layout'

export default function VideoPage() {
  const router = useRouter()
  const { id } = router.query
  return (
    <Layout>
      <main className="py-10 px-10 items-center">
        <VideoMain
          url="https://www.youtube.com/watch?v=wfLOt5P6nSk"
          controls={true}
          height="70vh"
          width="100%"
        />
        <section className="m-4">
          <CommentBox />
          <button className="m-2">Comment</button>
          <button className="m-2">Cancel</button>
        </section>
        <section className="m-4">
          <CommentSection>
            <section className="px-4">
              <h2>Akash Singh</h2>
              <p>This is a random comment</p>
              <section className="w-full px-4 flex justify-end">
                <button className=" w-auto">Delete</button>
              </section>
            </section>
            <section className="px-4">
              <h2>Akash Singh</h2>
              <p>This is a random comment</p>
              <section className="w-full flex px-4 justify-end">
                <button className=" w-auto">Delete</button>
              </section>
            </section>
          </CommentSection>
        </section>
      </main>
    </Layout>
  )
}
