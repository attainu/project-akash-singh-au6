import React from 'react'
import { connect } from 'react-redux';
import  { createStructuredSelector } from 'reselect';
import Link from 'next/link'
import axios from 'axios'

import {
  NavDesktopLeft,
  NavMobile,
  Modal,
  Filepond
} from '@insights-app/insights-components'

import { selectCurrentUser } from '../redux/user/userSelector'
import { setCurrentUser } from '../redux/user/userActions';
import { uploadVideo } from '../redux/videos/videoActions';
import { selectCurrentVideo } from '../redux/videos/videoSelector';

class Layout extends React.Component {
  constructor() {
    super()
    this.state = {
      showUploadModal: false,
      showLoginModal: false,
      showRegisterModal: false,
      video: '',
      title:'',
      name:'',
      username:'',
      email: '',
      password: '',
      confirmPassword:''
    }
  }

  toggleShowUpload = () => {
    this.setState({ showUploadModal: !this.state.showUploadModal })
  }

  toggleShowLogin = () => {
    this.setState({ showLoginModal: !this.state.showLoginModal })
  }

  toggleShowRegister = () => {
    this.setState({ showRegisterModal : !this.state.showRegisterModal })
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = async event => {
    event.preventDefault()
    const { setCurrentUser } = this.props
    const { email, password } = this.state
    const body = { email, password }
    console.log(body)
    let data =  await axios.post('http://localhost:4000/api/users/login', body, { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
    console.log(data.data)
    setCurrentUser(data.data)
  }

  handleSubmitRegister = async event => {
    event.preventDefault()
    //const { setCurrentUser } = this.props
    const {name, username, email, password, confirmPassword } = this.state
    const body = {name, username, email, password, confirmPassword }
    console.log(body)
    let data =  await axios.post('http://localhost:4000/api/users/signup', body, { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
    console.log(data.data)
    //setCurrentUser(data.data)
  }

  handleSubmitVideo = async event => {
    event.preventDefault()
    const { uploadVideo } = this.props
    const {video, title} = this.state
    const body = {video, title}
    console.log(body)
    let data =  await axios.post('http://localhost:4000/api/videos', body, { headers: { "Content-Type":"video/mp4"}, withCredentials: true })
    console.log(data.data)
    uploadVideo(data.data)
    alert("video got uploaded");
  }

  handleLogout = async event => {
    event.preventDefault()
    const { setCurrentUser } = this.props
    const data = await axios.get('http://localhost:4000/api/users/logout', { withCredentials: true })
    console.log(data)
    setCurrentUser(null)
  }
  handleUpload = (e) =>
  {
    e.target.files[0].destination="public/videos"
    e.target.files[0].filename=e.target.files[0].name
    //e.target.files[0].destination+"/"+
    this.setState({video:e.target.files[0]})}

  render() {
    const { children, currentUser } = this.props
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
            {
              currentUser ?
              <section key="profile" >
                <Link href="/profile"><a>Profile</a></Link>
                <Link href="/settings"><a>Settings</a></Link>
                <a onClick={this.handleLogout} >Sign Out</a>
              </section>
              :
              <section key="profile"><a onClick={this.toggleShowLogin}>login</a></section>
            }
            <section key="footer" className="flex justify-center mb-4">
              <button onClick={this.toggleShowUpload} className="focus:outline-none">
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
        <Modal show={this.state.showUploadModal} close={this.toggleShowUpload} title="Upload Video">
          <section className="mt-3">
        <input onChange={this.handleUpload} type="file" name="video" className="border-gray-300 border-2 mt-2 w-full" />
          </section>
          <section>
            <label htmlFor="title" className="uppercase font-bold">Video Title:</label>
            <input onChange={this.handleChange} name="title" className="border-gray-300 border-2 mt-2 w-full" />
          </section>
          <section className="mt-8 flex justify-end px-4">
            <button className="mx-2" onClick={this.toggleShowState}>Cancel</button>
            <button className="mx-2" onClick={this.handleSubmitVideo} >Upload</button>
          </section>
        </Modal>
        <Modal show={this.state.showLoginModal} close={this.toggleShowLogin} title="Login" >
          <section>
            <form onSubmit={this.handleSubmit} >
              <input onChange={this.handleChange} type="email" placeholder="Enter email" name="email" className="border-gray-300 border-2 mt-2 w-full" />
              <input onChange={this.handleChange} placeholder="Enter password" type="password"  name="password" className="border-gray-300 border-2 mt-2 w-full" />
              <button>Submit</button>
            </form>
            <h2>Don't have an account? <a onClick={this.toggleShowRegister}><span>Register</span></a> </h2>
          </section>
        </Modal>
        <Modal show={this.state.showRegisterModal} close={this.toggleShowRegister} title="Register" >
        <section>
            <form onSubmit={this.handleSubmitRegister} >
              <input onChange={this.handleChange} type="text" placeholder="Enter name" name="name" className="border-gray-300 border-2 mt-2 w-full" />
              <input onChange={this.handleChange} placeholder="Enter username" type="text"  name="username" className="border-gray-300 border-2 mt-2 w-full" />
              <input onChange={this.handleChange} type="email" placeholder="Enter email" name="email" className="border-gray-300 border-2 mt-2 w-full" />
              <input onChange={this.handleChange} placeholder="Enter password" type="password"  name="password" className="border-gray-300 border-2 mt-2 w-full" />
              <input onChange={this.handleChange} placeholder="Confirm password" type="password"  name="confirmPassword" className="border-gray-300 border-2 mt-2 w-full" />
              <button>Submit</button>
            </form>
          </section>
        </Modal>
      </section>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  uploadVideo: video => dispatch(uploadVideo(video))
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout) 
