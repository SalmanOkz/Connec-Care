// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

// import CardHeader from '@mui/material/CardHeader'
// import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'

// Icon Imports
// import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'

const Physio = () => {
  return (
    <section className='py-20 px-6 md:px-20 text-right'>
      {/* Section Title */}
      <Typography variant='h4' fontWeight='700' color='text.primary' gutterBottom>
        Choose the Care That Fits Your Needs
      </Typography>
      <Typography variant='body1' color='text.secondary' paragraph>
        Healthcare Professionals
      </Typography>

      {/* Physiotherapy Card */}
      <Grid container justifyContent='left'>
        <Grid item xs={8} md={6}>
          <Card
            sx={{
              padding: 4,
              borderRadius: 4,
              boxShadow: 3,
              backgroundColor: '#EAF3FF',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {/* Physiotherapy Icon */}
            <Avatar sx={{ backgroundColor: '#3B82F6', padding: 2, marginBottom: 2 }}>
              {/* <DirectionsRunIcon sx={{ color: '#fff', fontSize: 40 }} /> */}
            </Avatar>

            {/* Title */}
            <Typography variant='h6' fontWeight='600' color='text.primary' gutterBottom>
              Physiotherapy
            </Typography>

            {/* Subtext */}
            <Typography variant='body2' color='text.secondary' gutterBottom>
              recovery services
            </Typography>

            {/* Button */}
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
        </Grid>
      </Grid>
    </section>
  )
}

export default Physio
