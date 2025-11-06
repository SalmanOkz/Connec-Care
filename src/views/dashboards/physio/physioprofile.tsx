'use client'
import Grid2 from '@mui/material/Grid2'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'

import OptionMenu from '@core/components/option-menu'
import CustomIconButton from '@core/components/mui/IconButton'
import Link from '@components/Link'
import type { ConnectionsTabType } from '@/types/pages/profileTypes'

const PhysioProfile = ({ data }: { data?: ConnectionsTabType[] }) => {
  return (
    <Grid2 container spacing={6}>
      {data &&
        data.map((item, index) => (
          <Grid2 size={{ xs: 12, md: 6 }} key={index}>
            <Card className='relative'>
              <OptionMenu
                iconClassName='text-textDisabled'
                options={['Share Connection', 'Block Connection']}
                iconButtonProps={{ className: 'absolute top-6 end-5 text-textDisabled' }}
              />
              <CardContent className='flex flex-col items-center gap-6'>
                <Avatar src={item.avatar} alt='Nurse Avatar' className='!mbs-5 bs-[100px] is-[100px]' />
                <Typography variant='h5'>{item.name}</Typography>
                <Typography>{item.designation}</Typography>
                <div className='flex gap-4'>
                  {item.chips.map((chip, idx) => (
                    <Link key={idx}>
                      <Chip label={chip.title} color={chip.color} size='small' variant='tonal' />
                    </Link>
                  ))}
                </div>
                <div className='flex gap-4'>
                  <Button variant={item.isConnected ? 'contained' : 'tonal'}>
                    {item.isConnected ? 'Appointment Taken' : 'Appointment'}
                  </Button>
                  <CustomIconButton variant='tonal' color='secondary'>
                    <i className='tabler-mail' />
                  </CustomIconButton>
                </div>
              </CardContent>
            </Card>
          </Grid2>
        ))}
    </Grid2>
  )
}

export default PhysioProfile
