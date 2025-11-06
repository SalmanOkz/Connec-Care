// MUI Imports
import Grid2 from '@mui/material/Grid2'

// Component Imports
import PhysioProfile from '@/views/dashboards/physio/physioprofile'

const DashboardNurse = async () => {
  // Simulating data
  // const data = [
  //   {
  //     name: 'John Doe',
  //     designation: 'Registered Nurse',
  //     avatar: '/path/to/avatar.jpg',
  //     chips: [{ title: 'Wound Care', color: 'primary' }],
  //     projects: 5,
  //     tasks: 3,
  //     connections: 10,
  //     isConnected: false,
  //   },
  // ]

  return (
    <Grid2 container spacing={6}>
      <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
        <PhysioProfile />
      </Grid2>
    </Grid2>
  )
}

export default DashboardNurse
