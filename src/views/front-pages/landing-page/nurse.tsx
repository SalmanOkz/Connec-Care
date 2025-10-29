//import Link from 'next/link'

import classnames from 'classnames'
import Typography from '@mui/material/Typography'

import styles from './styles.module.css'

const ServicesSection = () => {
  return (
    <section className='pt-24 pb-0 px-8 md:px-20'>
      {/* Section Title */}
      <Typography
        className={classnames('font-extrabold sm:text-[42px] text-3xl mbe-4 leading-[48px]', styles.heroText)}
        textAlign={'center'}
      >
        Choose the Care That Fits Your Needs
      </Typography>
    </section>
  )
}

export default ServicesSection
