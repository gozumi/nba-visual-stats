import './home.component.css'

import ParitionLayout from 'client/app/blocks/notifications-layout'
import * as React from 'react'

export default function Home () {
  return (
    <section className='feature home'>
      <h1 className='home__header'>HOME</h1>
      <ParitionLayout className='dashboard-notifications' />
    </section>
  )
}
