import React, { useState } from 'react'
import { ModalConfirm } from '@insights-app/insights-components'
import Layout from '../components/Layout'

export default function Settings() {
  const [show, showStateSetter] = useState(false)
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')

  return (
    <Layout>
      <section className="justify-center flex my-10">
        <h2 className="text-lg font-bold">Settings</h2>
      </section>
      <section className="mx-20 my-32 flex justify-around w-auto">
        <button
          onClick={() => {
            showStateSetter(!show)
            setMessage('You sure want to delete your account?')
            setTitle('Delete Account')
          }}
        >
          Delete your account
        </button>
        <button
          onClick={() => {
            showStateSetter(!show)
            setMessage('You sure want to deactivate your account?')
            setTitle('Deactivate Account')
          }}
        >
          Deactivate your account
        </button>
      </section>
      <ModalConfirm
        title={title}
        message={message}
        show={show}
        close={() => showStateSetter(!show)}
      />
    </Layout>
  )
}
