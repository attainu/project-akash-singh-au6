import React from 'react'
import Link from 'next/link'

import {
  NavDesktopLeft,
  NavMobile,
  Modal,
  Button,
  Filepond
} from '@insights-app/insights-components'

class Layout extends React.Component {
  constructor() {
    super()
    this.state = {
      showModal: false,
    }
  }

  toggleShowState = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  render() {
    const { children } = this.props
    return (
      <section>
        <main className="antialiased box-border absolute h-screen w-screen flex flex-1 text-gray-900">
          <NavDesktopLeft title="Insights" >
            <section key="all" className="px-8 navSection">
              <ul className="block">
                <li>
                  <Link href="/">
                    <a>
                      <h2>Home</h2>
                    </a>
                  </Link>
                </li>
                <li className="block h-auto mt-8">
                  <h2 className="text-lg mb-4">Videos</h2>
                  <Link href="/video/trending">
                    <a className="mt-2">
                      <h2>Trending</h2>
                    </a>
                  </Link>
                  <Link href="/video/recommended">
                    <a className="-mt-2">
                      <h2>Recommended</h2>
                    </a>
                  </Link>
                  <Link href="/video/latest">
                    <a className="-mt-2">
                      <h2>Latest</h2>
                    </a>
                  </Link>
                  <Link href="/video/popular">
                    <a className="-mt-2">
                      <h2>Popular</h2>
                    </a>
                  </Link>
                </li>
                <li className="block h-auto mt-8">
                  <h2 className="text-lg mb-4">Collection</h2>
                  <Link href="/myvideos">
                    <a className="mt-2">
                      <h2>Your Videos</h2>
                    </a>
                  </Link>
                  <Link href="/most-liked">
                    <a className="-mt-2">
                      <h2>Most Liked</h2>
                    </a>
                  </Link>
                </li>
                <li className="block mt-10">
                  <h2 className="text-lg mb-4 w-full">More</h2>
                  <Link href="/premium">
                    <a className="mt-2">
                      <h2>Premium</h2>
                    </a>
                  </Link>
                </li>
                <hr className="mt-20" />
              </ul>
            </section>
            <section key="profile" >
              <Link href="/profile"><a>Profile</a></Link>
              <Link href="/settings"><a>Settings</a></Link>
              <Link href="/"><a>Sign Out</a></Link>
            </section>
            <section key="footer" className="flex justify-center mb-4">
              <button onClick={this.toggleShowState} className="focus:outline-none">
                <h2>Upload</h2>
              </button>
            </section>
          </NavDesktopLeft>
          <section className="flex w-full flex-col items-center justify-between md:overflow-auto">
            <section className="relative md:overflow-visible w-full items-center justify-center">
              {children}
            </section>
            <section className="fixed bottom-0 w-full">
              <NavMobile>
                <Link href="/">
                  <a>Home</a>
                </Link>
                <Link href="/">
                  <a>Home</a>
                </Link>
              </NavMobile>
            </section>
          </section>
        </main>
        <Modal show={this.state.showModal} close={this.toggleShowState} title="Upload Video">
          <section className="mt-3">
            <Filepond
              name='defaultfile'
              labelIdle='Drag your files or browse'
              imagePreviewHeight={120}
              allowMultiple={true}
              acceptedFileTypes={['image/*', 'video/*']}
              labelFileTypeNotAllowed='Invalid file type'
              allowReorder={true}
              dropOnPage={true}
            />
          </section>
          <section>
            <label for="video" className="uppercase font-bold">Video Title:</label>
            <input name="video" className="border-gray-300 border-2 mt-2 w-full" />
          </section>
          <section className="mt-8 flex justify-end px-4">
            <button className="mx-2" onClick={this.toggleShowState}>Cancel</button>
            <button className="mx-2" >Upload</button>
          </section>
        </Modal>
      </section>
    )
  }
}

export default Layout
