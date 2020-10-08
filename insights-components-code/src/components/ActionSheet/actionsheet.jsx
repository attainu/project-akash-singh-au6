import React from 'react'
import '../../styles/tailwind.css'
import './actionsheet.css'

export class ActionSheet extends React.Component {
  state = {
    show: false
  }

  changeShowState = () => {
    this.setState({ show: !this.state.show })
  }

  getComponent = (key) => {
    return this.props.children.filter((comp) => {
      return comp.key === key
    })
  }

  render() {
    return (
      <main className='relative select-none'>
        <section onClick={this.changeShowState}>
          {this.getComponent('button')}
        </section>
        {this.state.show ? (
          <main className='fixed bottom-0 inset-x-0 sm:static'>
            <div className='fixed inset-0' onClick={this.changeShowState}>
              <div className='absolute inset-0 bg-gray-700 opacity-75 sm:bg-transparent' />
            </div>
            <nav
              className='bg-white rounded-t-lg shadow-xl px-4 pt-5 pb-4 transform transition-all sm:origin-top sm:absolute sm:right-0 sm:mt-2 sm:w-56 sm:rounded-md sm:p-0 sm:border sm:border-gray-200 z-10'
              role='dialog'
            >
              {this.getComponent('all')}
            </nav>
          </main>
        ) : null}
      </main>
    )
  }
}
