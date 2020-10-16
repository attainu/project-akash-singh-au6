import React from 'react'
import axios from 'axios'
import {
  VideoMain,
  CommentBox,
  CommentSection,
  Modal
} from '@insights-app/insights-components'
import Layout from '../../../components/Layout'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getAllVideos } from '../../../redux/videos/videoActions'
import { getAllComments, AddComment } from '../../../redux/comments/commentActions'
import { setCurrentUser } from '../../../redux/user/userActions'
import { getAlllikes, Addlike } from '../../../redux/likes/likeActions'
import { selectCurrentUser } from '../../../redux/user/userSelector'
import { selectCurrentComment } from '../../../redux/comments/commentSelector'
import { selectCurrentLike } from '../../../redux/likes/likeSelector'

class VideoPage extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      username: '',
      comment: '',
      userComment:'',
      like:false,
      video:'',
      showLoginModal: false
    }
  }

  handleLike = async event => {
    event.preventDefault()
    this.setState({like:true})
    const { Addlike } = this.props
    let data =  await axios.post(`http://localhost:4000/api/videos/5f8866ed9de14d19c4d52c01/like`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
    console.log(data.data)
    Addlike(data.data)
  }

  toggleShowLogin = () => {
    this.setState({ showLoginModal: !this.state.showLoginModal })
  }

  componentDidMount() {
    axios.get(`http://localhost:4000/api/videos/5f8866ed9de14d19c4d52c01`, { withCredentials: true })
      .then(res => {
        console.log(res.data.data.data.video)
        this.setState({video:res.data.data.data.video})
      })
    axios.get(`http://localhost:4000/api/videos/5f8866ed9de14d19c4d52c01/comment`, { withCredentials: true })
        .then(res => {
          console.log(res.data.data.comments)
          this.setState({ comment: res.data.data.comments })
        })
    axios.get(`http://localhost:4000/api/videos/5f8866ed9de14d19c4d52c01/like`, { withCredentials: true })
        .then(res => {
          console.log(res.data.data.like)
          this.setState({ like: res.data.data.like })
        })
  }

  //text field change handle
  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }


  //login handler
  handleSubmit = async event => {
    event.preventDefault()
    const { setCurrentUser } = this.props
    const { email, password } = this.state
    const body = { email, password }
    console.log(body)
    let data =  await axios.post('http://localhost:4000/api/users/login', body, { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
    console.log(data.data)
    setCurrentUser(data.data)
    alert("Logged In successfully")
  }

  //signup handler
  handleSubmitRegister = async event => {
    event.preventDefault()
    const {name, username, email, password, confirmPassword } = this.state
    const body = {name, username, email, password, confirmPassword }
    console.log(body)
    let data =  await axios.post('http://localhost:4000/api/users/signup', body, { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
    console.log(data.data)
    alert("Registered successfully")
  }


  //comment handler
  handleComment = async event => {
    event.preventDefault()
    const { AddComment } = this.props
    const { userComment } = this.state
    const body = { userComment }
    console.log(body)
    let data = await axios.post(`http://localhost:4000/api/videos/5f8866ed9de14d19c4d52c01/comment`, body, { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true })
    console.log(data.data.data.comments)
    this.setState({userComment:data.data.data.comments})
    AddComment(data.data.data.comments)
  }

  render() {
    const { currentUser, AddComment  } = this.props
    const { like, username, comment, userComment } = this.state
    return (
      <Layout>
        <main className="py-10 px-10 items-center">
          <VideoMain
            url='https://youtu.be/hMAPyGoqQVw?list=RDhMAPyGoqQVw'
            controls={true}
            height="70vh"
            width="100%"
          />
          {/* protecting like and comment feature */}
          {
            currentUser ?
              <>
                <button className="m-2" onClick={this.handleLike}>Like</button><span>{like?"1":"0"}</span>
                <section className="m-4">
                  <CommentBox />
                  <button className="m-2" onClick={this.handleComment}>Comment</button>
                  <button className="m-2">Cancel</button>
                </section>
                <section className="m-4">
                  <CommentSection>
                    <section className="px-4">
                      <h2>{username}</h2>
                      <p>{comment}</p>
                      <section className="w-full px-4 flex justify-end">
                        <button className=" w-auto">Delete</button>
                      </section>
                    </section>
                    <section className="px-4">
                      <h2>{username}</h2>
                      <p>{userComment}</p>
                      <section className="w-full flex px-4 justify-end">
                        <button className=" w-auto">Delete</button>
                      </section>
                    </section>
                  </CommentSection>
                </section>
              </>
              :
              <section key="profile"><a onClick={this.toggleShowLogin}>login to like and comment</a></section>
          }
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
        </main>
      </Layout>
    )
  }
}
//redux mapping
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  currentComment: selectCurrentComment,
  currentLike: selectCurrentLike
})

//redux dispatching
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  getVideo: video => dispatch(getAllVideos(video)),
  getAllComments: comment => dispatch(getAllComments(comment)),
  AddComment: comment => dispatch(AddComment(comment)),
  getAlllikes: like => dispatch(getAlllikes(like)),
  Addlike: like => dispatch(Addlike(like))
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoPage) 
