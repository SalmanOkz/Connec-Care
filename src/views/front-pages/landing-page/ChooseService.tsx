// src/components/ThreeColumnSection.tsx
'use client'

import React from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import VaccinesIcon from '@mui/icons-material/Vaccines'
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics'
import Box from '@mui/material/Box'

import Link from '@/components/Link'

const ThreeColumnSection = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #dee2e6 100%)',
        padding: { xs: '40px 20px', md: '60px 80px' },
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 4, md: 6 },
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 2,
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        margin: '40px auto',
        maxWidth: '1200px',
        position: 'relative'
      }}
    >
      {/* Left Column - Text */}
      <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
        <Typography variant='h3' component='h2' color='primary' gutterBottom>
          Choose the care that fits your needs
        </Typography>
        <Typography variant='body1' color='text.secondary' paragraph>
          Whether you need routine check-ups, specialist consultations, or emergency care, we’ve got you covered.
        </Typography>
        {/* <Button variant='contained' color='primary' size='large'>
          Get Started
        </Button> */}
      </Box>

      {/* Middle Column - Pricing Card */}
      <Card
        sx={{
          flex: 1,
          maxWidth: { xs: '100%', md: 345 },
          boxShadow: 3,
          transition: 'transform 0.2s ease-in-out',
          '&:hover': { transform: 'scale(1.02)' }
        }}
      >
        <CardContent sx={{ textAlign: 'center', padding: 3 }}>
          <VaccinesIcon color='primary' fontSize='large' sx={{ mb: 2 }} />
          <Typography variant='h6' component='div' gutterBottom>
            Nursing
          </Typography>
          <Typography variant='body2' color='text.secondary' paragraph>
            Efficient, Delegated and Professional nursing experience at your doorstep.
          </Typography>
          <Button variant='contained' color='primary' component={Link} href='/pages/auth/login-v2'>
            Book Now!
          </Button>
        </CardContent>
      </Card>

      {/* Right Column - Identical Pricing Card */}
      <Card
        sx={{
          flex: 1,
          maxWidth: { xs: '100%', md: 345 },
          boxShadow: 3,
          transition: 'transform 0.2s ease-in-out',
          '&:hover': { transform: 'scale(1.02)' }
        }}
      >
        <CardContent sx={{ textAlign: 'center', padding: 3 }}>
          <SportsGymnasticsIcon color='primary' fontSize='large' sx={{ mb: 2 }} />
          <Typography variant='h6' component='div' gutterBottom>
            Physiotherapy
          </Typography>
          <Typography variant='body2' color='text.secondary' paragraph>
            Let your demand of Physiotherapy be fulfiled on a single click.
          </Typography>
          <Button variant='contained' color='primary' component={Link} href='/pages/auth/login-v2'>
            Book Now!
          </Button>
        </CardContent>
      </Card>
    </Box>
  )
}

export default ThreeColumnSection
