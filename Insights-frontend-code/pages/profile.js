import Link from 'next/link'
import Layout from '../components/Layout'

export default function Profile() {
  return (
    <Layout>
      <section className="flex justify-center my-10">
        <h2 className="text-lg">Welcome to your profile</h2>
      </section>
      <section className="flex justify-center mt-32 w-fix">
        <section>
          <label for="email">
            <span className="uppercase font-extrabold">Email</span>
          </label>
          <input
            className="mx-4 w-56 px-2 focus:outline-none"
            type="text"
            name="email"
            placeholder="1311akashsingh@gmail.com"
          />
        </section>
        <section>
          <label for="username">
            <span className="uppercase font-extrabold">Username</span>
          </label>
          <input
            className="mx-4 w-56 px-2 focus:outline-none"
            type="text"
            name="username"
            placeholder="akaaaashsingh"
          />
        </section>
      </section>
      <section className="flex justify-center my-20">
        <button>Update</button>
      </section>
      <section className="flex justify-center mt-32 w-fix">
        <section>
          <label for="password">
            <span className="uppercase font-extrabold">Password</span>
          </label>
          <input
            className="mx-4 w-48 px-2 focus:outline-none"
            type="password"
            name="password"
            placeholder="*********"
          />
        </section>
        <section>
          <label for="confirmPassword">
            <span className="uppercase font-extrabold">Confirm Password</span>
          </label>
          <input
            className="mx-4 w-48 px-2 focus:outline-none"
            type="password"
            name="confirmPassword"
            placeholder="*********"
          />
        </section>
      </section>
      <section className="flex justify-center my-20">
        <button>Update</button>
      </section>
      <section className="flex justify-start mx-10 my-20">
        <h2 className="text-md">Your Subscription:</h2>
        <div className="bg-indigo-600 h-5 mx-4 px-4 text-white rounded">
          <p className="text-xs">Basic</p>
        </div>
        <div className="w-64">
          <Link href="/premium">
            <a className="w-20 p-0">Upgrade</a>
          </Link>
        </div>
      </section>
    </Layout>
  )
}
