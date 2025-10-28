import Link from 'next/link'

// MUI Imports
import Grid2 from '@mui/material/Grid2' // Updated import for Grid2
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'
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
      <div className='md:max-is-[550px] mbs-0 mbe-7 mli-auto text-center relative'></div>

      {/* Cards Grid */}
      <Grid2 container spacing={4} justifyContent='center'>
        {/* Nurse Card */}
        <Grid2 size={{ xs: 12, md: 5, lg: 6 }}>
          <Link href='/nursing-care' passHref>
            <Card
              sx={{
                padding: 4,
                borderRadius: 4,
                height: '60vh',
                boxShadow: 3,
                backgroundColor: theme => (theme.palette.mode === 'dark' ? '#25293C' : '#E0F7F5'),
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)'
                }
              }}
            >
              <Avatar sx={{ backgroundColor: '#2EC4B6', padding: 4, marginBottom: 2 }}>
                <LocalHospitalIcon sx={{ color: '#fff', fontSize: 40 }} />
              </Avatar>
              <div className='flex items-center gap-x-2'>
                <Typography color='text.primary' variant='h4' className='text-center'>
                  <span className='relative z-[1] font-extrabold'>Nurse</span>
                </Typography>
              </div>
              <Typography variant='body2' color='text.secondary' gutterBottom>
                medical services
              </Typography>
              <Button
                variant='contained'
                sx={{
                  backgroundColor: '#2EC4B6',
                  color: 'white',
                  padding: '8px 20px',
                  textTransform: 'none',
                  '&:hover': { backgroundColor: '#28B0A3' }
                }}
              >
                Book a Nurse
              </Button>
            </Card>
          </Link>
        </Grid2>

        {/* Physiotherapy Card */}
        <Grid2 size={{ xs: 14, md: 5, lg: 6 }}>
          <Link href='/physiotherapy-care' passHref>
            <Card
              sx={{
                padding: 4,
                borderRadius: 4,
                height: '60vh',
                boxShadow: 3,
                backgroundColor: theme => (theme.palette.mode === 'dark' ? '#25293C' : '#EAF3FF'),
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)'
                }
              }}
            >
              <Avatar sx={{ backgroundColor: '#3B82F6', padding: 2, marginBottom: 2 }}>
                <DirectionsRunIcon sx={{ color: '#fff', fontSize: 40 }} />
              </Avatar>
              <div className='flex items-center gap-x-2'>
                <Typography color='text.primary' variant='h4' className='text-center'>
                  <span className='relative z-[1] font-extrabold'>Physio</span>
                </Typography>
              </div>
              <Typography variant='body2' color='text.secondary' gutterBottom>
                recovery services
              </Typography>
              <Button
                variant='contained'
                sx={{
                  backgroundColor: '#3B82F6',
                  color: 'white',
                  padding: '8px 20px',
                  textTransform: 'none',
                  '&:hover': { backgroundColor: '#2563EB' }
                }}
              >
                Book a Physio
              </Button>
            </Card>
          </Link>
        </Grid2>
      </Grid2>
    </section>
  )
}

export default ServicesSection
