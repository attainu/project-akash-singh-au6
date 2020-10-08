import React from 'react'
import { CommentSection } from '../components/Comment/commentSection'

export default {
  title: 'CommentSection',
  component: CommentSection
}

export const DefaultCommentSection = () => (
  <CommentSection>
    <section>
      <h2>Username</h2>
      <p>Comment goes here</p>
    </section>
    <section>
      <h2>Username</h2>
      <p>Comment goes here</p>
    </section>
  </CommentSection>
)
