'use client'

// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
import Connections from '../user-profile/connections'

const UserProfile = () => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }} className='flex flex-col gap-6'>
        <Connections />
      </Grid>
    </Grid>
  )
}

export default UserProfile
