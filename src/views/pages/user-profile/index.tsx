'use client'

// React Imports
import type { ReactElement } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'

// Type Imports
import type { Data } from '@/types/pages/profileTypes'

const UserProfile = ({ tabContentList }: { tabContentList: { [key: string]: ReactElement }; data?: Data }) => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }} className='flex flex-col gap-6'>
        {/* Directly render Connections tab content without clicking */}
        {tabContentList['connections']}
      </Grid>
    </Grid>
  )
}

export default UserProfile
