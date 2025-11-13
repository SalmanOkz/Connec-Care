// MUI Imports
import Typography from '@mui/material/Typography'

import classnames from 'classnames'

import styles from './styles.module.css'

const ServicesSection = () => {
  return (
    <section className='py-24 px-8 md:px-20'>
      {/* Section Title */}
      <Typography
        className={classnames('font-extrabold sm:text-[42px] text-3xl mbe-4 leading-[48px]', styles.heroText)}
        textAlign={'center'}
      >
        Choose the Care That Fits Your Needs
      </Typography>

      <Typography variant='body1' className='font-medium' color='text.primary' textAlign={'center'}>
        healthcare professionals
      </Typography>
    </section>
  )
}

export default ServicesSection
