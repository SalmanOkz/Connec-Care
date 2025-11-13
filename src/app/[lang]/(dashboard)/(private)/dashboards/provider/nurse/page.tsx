// MUI Imports
import Grid2 from '@mui/material/Grid2'

// Component Imports
import PhysioProfile from '@/views/dashboards/physio/physioprofile'

const DashboardNurse = async () => {
  return (
    <Grid2 container spacing={6}>
      <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
        <PhysioProfile />
      </Grid2>
    </Grid2>
  )
}

export default DashboardNurse
