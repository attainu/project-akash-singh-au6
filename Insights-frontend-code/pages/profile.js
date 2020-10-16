import Link from 'next/link'
import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import axios from 'axios'
import { selectCurrentUser } from '../redux/user/userSelector'
import Layout from '../components/Layout'
import Router from 'next/router'

class Profile extends React.Component {

  constructor() {
    super()
    this.state = {
      email: '',
      username: '',
      oldPassword: '',
      password: '',
      confirmPassword: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/api/users/me', { withCredentials: true })
    .then(res => {
      this.setState({ email: res.data.data.data.email, username: res.data.data.data.username })
    })
  }
  
  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  updateData = async () => {
    const { email, username } = this.state
    const body = { email, username }
    await axios.patch('http://localhost:4000/api/users/update-me', body, { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
    alert('Updated')
  }

  updatePassword = async () => {
    const { password, confirmPassword, oldPassword } = this.state
    const body = { password, confirmPassword, oldPassword }
    await axios.patch('http://localhost:4000/api/users/update-password', body, { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
    alert('Updated')
  }

  render() {
    const { currentUser } = this.props
    if (!currentUser) {
      Router.push('/')
    }

    const { email, username } = this.state

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
              onChange={this.handleChange}
              placeholder={email}
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
              onChange={this.handleChange}
              placeholder={username}
            />
          </section>
        </section>
        <section className="flex justify-center my-20">
          <button onClick={this.updateData} >Update Data</button>
        </section>
        <section className="flex justify-center mt-32 w-fix">
          <section>
            <label for="oldPassword">
              <span className="uppercase font-extrabold">Old Password</span>
            </label>
            <input
              className="mx-4 w-48 px-2 focus:outline-none"
              type="password"
              onChange={this.handleChange}
              name="oldPassword"
              placeholder="*********"
            />
          </section>
          <section>
            <label for="password">
              <span className="uppercase font-extrabold">Password</span>
            </label>
            <input
              className="mx-4 w-48 px-2 focus:outline-none"
              type="password"
              onChange={this.handleChange}
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
              onChange={this.handleChange}
              name="confirmPassword"
              placeholder="*********"
            />
          </section>
        </section>
        <section className="flex justify-center my-20">
          <button onClick={this.updatePassword}>Update</button>
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
  
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

export default connect(mapStateToProps)(Profile)
