'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import Step from '@mui/material/Step'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MuiStepper from '@mui/material/Stepper'
import MenuItem from '@mui/material/MenuItem'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import type { StepperProps } from '@mui/material/Stepper'

// Third-party Imports
import { toast } from 'react-toastify'
import { Controller, useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { email, object, minLength, string, array, forward, pipe, nonEmpty, check } from 'valibot'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import StepperWrapper from '@core/styles/stepper'
import StepperCustomDot from '@components/stepper-dot'
import DirectionalIcon from '@components/DirectionalIcon'

// Vars
const steps = [
  {
    title: 'Personal Information',
    subtitle: 'Enter your personal details'
  },
  {
    title: 'Service Details',
    subtitle: 'Which Service'
  },
  {
    title: 'Location & Accessibility',
    subtitle: 'Address'
  }

  // ,
  // {
  //   title: 'Health & Safety Information',
  //   subtitle: 'Medical History'
  // },
  // {
  //   title: 'Additional Information & Preferences',
  //   subtitle: 'Any extra details you want to share'
  // },
  // {
  //   title: 'Consent & Confirmation',
  //   subtitle: 'Terms & Policies'
  // }
]

// Styled Components
const Stepper = styled(MuiStepper)<StepperProps>(({ theme }) => ({
  justifyContent: 'center',
  '& .MuiStep-root': {
    '&:first-of-type': {
      paddingInlineStart: 0
    },
    '&:last-of-type': {
      paddingInlineEnd: 0
    },
    [theme.breakpoints.down('md')]: {
      paddingInline: 0
    }
  }
}))

const accountValidationSchema = object({
  username: pipe(string(), nonEmpty('This field is required'), minLength(1)),
  email: pipe(string(), nonEmpty('This field is required'), email('Please enter a valid email address')),
  password: pipe(
    string(),
    nonEmpty('This field is required'),
    minLength(8, 'Password must be at least 8 characters long')
  ),
  confirmPassword: pipe(string(), nonEmpty('This field is required'), minLength(1))
})

const accountSchema = pipe(
  accountValidationSchema,
  forward(
    check(input => input.password === input.confirmPassword, 'Passwords do not match.'),
    ['confirmPassword']
  )
)

const personalSchema = object({
  firstName: pipe(string(), nonEmpty('This field is required'), minLength(1)),
  lastName: pipe(string(), nonEmpty('This field is required'), minLength(1)),
  country: pipe(string(), nonEmpty('This field is required'), minLength(1)),
  language: pipe(array(string()), nonEmpty('This field is required'), minLength(1))
})

const socialSchema = object({
  twitter: pipe(string(), nonEmpty('This field is required'), minLength(1)),
  facebook: pipe(string(), nonEmpty('This field is required'), minLength(1)),
  google: pipe(string(), nonEmpty('This field is required'), minLength(1)),
  linkedIn: pipe(string(), nonEmpty('This field is required'), minLength(1))
})

const StepperLinearWithValidation = () => {
  // States
  const [activeStep, setActiveStep] = useState(0)
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)

  // Vars
  const Languages = ['English', 'Urdu']

  // Hooks
  const {
    reset: accountReset,
    control: accountControl,
    handleSubmit: handleAccountSubmit,
    formState: { errors: accountErrors }
  } = useForm({
    resolver: valibotResolver(accountSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const {
    reset: personalReset,
    control: personalControl,
    handleSubmit: handlePersonalSubmit,
    formState: { errors: personalErrors }
  } = useForm({
    resolver: valibotResolver(personalSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      country: '',
      language: []
    }
  })

  const {
    reset: socialReset,
    control: socialControl,
    handleSubmit: handleSocialSubmit,
    formState: { errors: socialErrors }
  } = useForm({
    resolver: valibotResolver(socialSchema),
    defaultValues: {
      twitter: '',
      facebook: '',
      google: '',
      linkedIn: ''
    }
  })

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const handleClickShowConfirmPassword = () => setIsConfirmPasswordShown(show => !show)

  const onSubmit = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)

    if (activeStep === steps.length - 1) {
      toast.success('Form Submitted')
    }
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
    accountReset({ email: '', username: '', password: '', confirmPassword: '' })
    personalReset({ firstName: '', lastName: '', country: '', language: [] })
    socialReset({ twitter: '', facebook: '', google: '', linkedIn: '' })
    setIsPasswordShown(false)
    setIsConfirmPasswordShown(false)
  }

  const renderStepContent = (activeStep: number) => {
    switch (activeStep) {
      case 0:
        return (
          <form key={0} onSubmit={handleAccountSubmit(onSubmit)}>
            <Grid container spacing={6}>
              <Grid size={{ xs: 12 }}>
                <Typography className='font-medium' color='text.primary'>
                  {steps[0].title}
                </Typography>
                <Typography variant='body2'>{steps[0].subtitle}</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name='username'
                  control={accountControl}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      label='Username'
                      placeholder='johnDoe'
                      {...(accountErrors.username && { error: true, helperText: accountErrors.username.message })}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name='email'
                  control={accountControl}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      type='email'
                      label='Email'
                      placeholder='johndoe@gmail.com'
                      {...(accountErrors.email && { error: true, helperText: accountErrors.email.message })}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name='password'
                  control={accountControl}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      label='Password'
                      placeholder='············'
                      id='stepper-linear-validation-password'
                      type={isPasswordShown ? 'text' : 'password'}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position='end'>
                              <IconButton
                                edge='end'
                                onClick={handleClickShowPassword}
                                onMouseDown={e => e.preventDefault()}
                                aria-label='toggle password visibility'
                              >
                                <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                              </IconButton>
                            </InputAdornment>
                          )
                        }
                      }}
                      {...(accountErrors.password && { error: true, helperText: accountErrors.password.message })}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name='confirmPassword'
                  control={accountControl}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      label='Confirm Password'
                      placeholder='············'
                      id='stepper-linear-confirmPassword'
                      type={isConfirmPasswordShown ? 'text' : 'password'}
                      {...(accountErrors['confirmPassword'] && {
                        error: true,
                        helperText: accountErrors['confirmPassword'].message
                      })}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position='end'>
                              <IconButton
                                edge='end'
                                onClick={handleClickShowConfirmPassword}
                                onMouseDown={e => e.preventDefault()}
                                aria-label='toggle password visibility'
                              >
                                <i className={isConfirmPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                              </IconButton>
                            </InputAdornment>
                          )
                        }
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12 }} className='flex justify-between'>
                <Button
                  variant='tonal'
                  disabled
                  color='secondary'
                  startIcon={<DirectionalIcon ltrIconClass='tabler-arrow-left' rtlIconClass='tabler-arrow-right' />}
                >
                  Back
                </Button>
                <Button
                  variant='contained'
                  type='submit'
                  endIcon={<DirectionalIcon ltrIconClass='tabler-arrow-right' rtlIconClass='tabler-arrow-left' />}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      case 1:
        return (
          <form key={1} onSubmit={handlePersonalSubmit(onSubmit)}>
            <Grid container spacing={6}>
              <Grid size={{ xs: 12 }}>
                <Typography className='font-medium' color='text.primary'>
                  {steps[1].title}
                </Typography>
                <Typography variant='body2'>{steps[1].subtitle}</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name='firstName'
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      label='First Name'
                      placeholder='John'
                      {...(personalErrors.firstName && {
                        error: true,
                        helperText: personalErrors.firstName.message
                      })}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name='lastName'
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      label='Last Name'
                      placeholder='Doe'
                      {...(personalErrors.lastName && {
                        error: true,
                        helperText: personalErrors.lastName.message
                      })}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name='country'
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField
                      select
                      fullWidth
                      label='Country'
                      {...field}
                      error={Boolean(personalErrors.country)}
                    >
                      <MenuItem value='UK'>UK</MenuItem>
                      <MenuItem value='USA'>USA</MenuItem>
                      <MenuItem value='Australia'>Australia</MenuItem>
                      <MenuItem value='Germany'>Germany</MenuItem>
                    </CustomTextField>
                  )}
                />
                {personalErrors.country && <FormHelperText error>country is a required field</FormHelperText>}
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name='language'
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      fullWidth
                      slotProps={{
                        select: { multiple: true }
                      }}
                      label='Language'
                      value={Array.isArray(value) ? value : []}
                      onChange={onChange}
                      error={Boolean(personalErrors.language)}
                    >
                      {Languages.map(language => (
                        <MenuItem key={language} value={language}>
                          {language}
                        </MenuItem>
                      ))}
                    </CustomTextField>
                  )}
                />
                {personalErrors.language && <FormHelperText error>language is a required field</FormHelperText>}
              </Grid>
              <Grid size={{ xs: 12 }} className='flex justify-between'>
                <Button
                  variant='tonal'
                  onClick={handleBack}
                  color='secondary'
                  startIcon={<DirectionalIcon ltrIconClass='tabler-arrow-left' rtlIconClass='tabler-arrow-right' />}
                >
                  Back
                </Button>
                <Button
                  variant='contained'
                  type='submit'
                  endIcon={<DirectionalIcon ltrIconClass='tabler-arrow-right' rtlIconClass='tabler-arrow-left' />}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      case 2:
        return (
          <form key={2} onSubmit={handleSocialSubmit(onSubmit)}>
            <Grid container spacing={6}>
              <Grid size={{ xs: 12 }}>
                <Typography className='font-medium' color='text.primary'>
                  {steps[2].title}
                </Typography>
                <Typography variant='body2'>{steps[2].subtitle}</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name='twitter'
                  control={socialControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      value={value}
                      onChange={onChange}
                      fullWidth
                      label='Twitter'
                      placeholder='https://twitter.com/johndoe'
                      {...(socialErrors.twitter && { error: true, helperText: socialErrors.twitter.message })}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name='facebook'
                  control={socialControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      value={value}
                      onChange={onChange}
                      fullWidth
                      label='Facebook'
                      placeholder='https://facebook.com/johndoe'
                      {...(socialErrors.facebook && { error: true, helperText: socialErrors.facebook.message })}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name='google'
                  control={socialControl}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      label='Google'
                      placeholder='https://google.com/johndoe'
                      {...(socialErrors.google && { error: true, helperText: socialErrors.google.message })}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name='linkedIn'
                  control={socialControl}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      label='LinkedIn'
                      placeholder='https://linkedin.com/johndoe'
                      {...(socialErrors.linkedIn && { error: true, helperText: socialErrors.linkedIn.message })}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12 }} className='flex justify-between'>
                <Button
                  variant='tonal'
                  onClick={handleBack}
                  color='secondary'
                  startIcon={<DirectionalIcon ltrIconClass='tabler-arrow-left' rtlIconClass='tabler-arrow-right' />}
                >
                  Back
                </Button>
                <Button variant='contained' type='submit' endIcon={<i className='tabler-check' />}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      default:
        return <Typography>Unknown stepIndex</Typography>
    }
  }

  return (
    <Card>
      <CardContent>
        <StepperWrapper>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const labelProps: {
                error?: boolean
              } = {}

              if (index === activeStep) {
                labelProps.error = false

                if (
                  (accountErrors.email ||
                    accountErrors.username ||
                    accountErrors.password ||
                    accountErrors['confirmPassword']) &&
                  activeStep === 0
                ) {
                  labelProps.error = true
                } else if (
                  (personalErrors.firstName ||
                    personalErrors.lastName ||
                    personalErrors.country ||
                    personalErrors.language) &&
                  activeStep === 1
                ) {
                  labelProps.error = true
                } else if (
                  (socialErrors.google || socialErrors.twitter || socialErrors.facebook || socialErrors.linkedIn) &&
                  activeStep === 2
                ) {
                  labelProps.error = true
                } else {
                  labelProps.error = false
                }
              }

              return (
                <Step key={index} className='max-md:mbe-5'>
                  <StepLabel
                    {...labelProps}
                    slots={{
                      stepIcon: StepperCustomDot
                    }}
                  >
                    <div className='step-label'>
                      <Typography className='step-number'>{`0${index + 1}`}</Typography>
                      <div>
                        <Typography className='step-title' color='text.primary'>
                          {label.title}
                        </Typography>
                        <Typography className='step-subtitle'>{label.subtitle}</Typography>
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              )
            })}
          </Stepper>
        </StepperWrapper>
      </CardContent>
      <Divider />
      <CardContent>
        {activeStep === steps.length ? (
          <>
            <Typography className='mlb-2 mli-1'>All steps are completed!</Typography>
            <div className='flex justify-end mt-4'>
              <Button variant='contained' onClick={handleReset}>
                Reset
              </Button>
            </div>
          </>
        ) : (
          renderStepContent(activeStep)
        )}
      </CardContent>
    </Card>
  )
}

export default StepperLinearWithValidation

// 'use client'

// // React Imports
// import { useState } from 'react'

// // MUI Imports
// import { styled } from '@mui/material/styles'
// import Grid from '@mui/material/Grid2'
// import Card from '@mui/material/Card'
// import Step from '@mui/material/Step'
// import Button from '@mui/material/Button'
// import Divider from '@mui/material/Divider'
// import MuiStepper from '@mui/material/Stepper'
// import MenuItem from '@mui/material/MenuItem'
// import StepLabel from '@mui/material/StepLabel'
// import Typography from '@mui/material/Typography'
// import CardContent from '@mui/material/CardContent'
// import FormHelperText from '@mui/material/FormHelperText'
// import Radio from '@mui/material/Radio'
// import RadioGroup from '@mui/material/RadioGroup'
// import FormControlLabel from '@mui/material/FormControlLabel'
// import FormControl from '@mui/material/FormControl'
// import FormLabel from '@mui/material/FormLabel'
// import Checkbox from '@mui/material/Checkbox'
// import TextField from '@mui/material/TextField'
// import type { StepperProps } from '@mui/material/Stepper'

// // Third-party Imports
// import { toast } from 'react-toastify'
// import { Controller, useForm } from 'react-hook-form'
// import { valibotResolver } from '@hookform/resolvers/valibot'
// import { email, object, minLength, string, pipe, nonEmpty, optional, picklist } from 'valibot'

// // Styled Components
// const Stepper = styled(MuiStepper)<StepperProps>(({ theme }) => ({
//   justifyContent: 'center',
//   '& .MuiStep-root': {
//     '&:first-of-type': {
//       paddingInlineStart: 0
//     },
//     '&:last-of-type': {
//       paddingInlineEnd: 0
//     },
//     [theme.breakpoints.down('md')]: {
//       paddingInline: 0
//     }
//   }
// }))

// // Simple styled dot component
// const StepperCustomDot = ({ active, completed }: any) => {
//   return (
//     <div style={{
//       width: 12,
//       height: 12,
//       borderRadius: '50%',
//       backgroundColor: completed ? '#4CAF50' : active ? '#2196F3' : '#E0E0E0'
//     }} />
//   )
// }

// // Validation Schemas
// const personalInfoSchema = object({
//   fullName: pipe(string(), nonEmpty('This field is required'), minLength(2)),
//   email: pipe(string(), nonEmpty('This field is required'), email('Please enter a valid email address')),
//   phone: pipe(string(), nonEmpty('This field is required'), minLength(10)),
//   age: pipe(string(), nonEmpty('This field is required')),
//   gender: pipe(string(), nonEmpty('This field is required')),
//   language: optional(string())
// })

// const serviceDetailsSchema = object({
//   serviceMode: pipe(string(), nonEmpty('This field is required')),
//   serviceType: pipe(string(), nonEmpty('This field is required')),
//   reason: pipe(string(), nonEmpty('This field is required'), minLength(10)),
//   date: pipe(string(), nonEmpty('This field is required')),
//   time: pipe(string(), nonEmpty('This field is required')),
//   urgency: pipe(string(), nonEmpty('This field is required')),
//   duration: optional(string())
// })

// const locationSchema = object({
//   address: pipe(string(), nonEmpty('This field is required'), minLength(5)),
//   apartment: optional(string()),
//   accessibility: optional(string())
// })

// const healthInfoSchema = object({
//   medicalHistory: pipe(string(), nonEmpty('This field is required'), minLength(10)),
//   medications: pipe(string(), nonEmpty('This field is required')),
//   limitations: optional(string())
// })

// const additionalInfoSchema = object({
//   instructions: optional(string()),
//   caregiverGender: optional(string()),
//   communication: pipe(string(), nonEmpty('This field is required')),
//   recurring: optional(string())
// })

// const consentSchema = object({
//   termsAccepted: pipe(string(), nonEmpty('You must accept the terms')),
//   dataConsent: pipe(string(), nonEmpty('You must consent to data use'))
// })

// const StepperLinearWithValidation = () => {
//   // States
//   const [activeStep, setActiveStep] = useState(0)
//   const [serviceMode, setServiceMode] = useState('')
//   const [formData, setFormData] = useState<any>({})

//   // Define steps
//   const steps = [
//     {
//       title: 'Personal Information',
//       subtitle: 'Enter your personal details'
//     },
//     {
//       title: 'Service Details',
//       subtitle: 'Which Service'
//     },
//     {
//       title: 'Location & Accessibility',
//       subtitle: 'Address'
//     },
//     {
//       title: 'Health & Safety Information',
//       subtitle: 'Medical History'
//     },
//     {
//       title: 'Additional Information & Preferences',
//       subtitle: 'Any extra details you want to share'
//     },
//     {
//       title: 'Consent & Confirmation',
//       subtitle: 'Terms & Policies'
//     }
//   ]

//   // Form hooks
//   const {
//     reset: personalReset,
//     control: personalControl,
//     handleSubmit: handlePersonalSubmit,
//     formState: { errors: personalErrors }
//   } = useForm({
//     resolver: valibotResolver(personalInfoSchema),
//     defaultValues: {
//       fullName: '',
//       email: '',
//       phone: '',
//       age: '',
//       gender: '',
//       language: ''
//     }
//   })

//   const {
//     reset: serviceReset,
//     control: serviceControl,
//     handleSubmit: handleServiceSubmit,
//     formState: { errors: serviceErrors }
//   } = useForm({
//     resolver: valibotResolver(serviceDetailsSchema),
//     defaultValues: {
//       serviceMode: '',
//       serviceType: '',
//       reason: '',
//       date: '',
//       time: '',
//       urgency: '',
//       duration: ''
//     }
//   })

//   const {
//     reset: locationReset,
//     control: locationControl,
//     handleSubmit: handleLocationSubmit,
//     formState: { errors: locationErrors }
//   } = useForm({
//     resolver: valibotResolver(locationSchema),
//     defaultValues: {
//       address: '',
//       apartment: '',
//       accessibility: ''
//     }
//   })

//   const {
//     reset: healthReset,
//     control: healthControl,
//     handleSubmit: handleHealthSubmit,
//     formState: { errors: healthErrors }
//   } = useForm({
//     resolver: valibotResolver(healthInfoSchema),
//     defaultValues: {
//       medicalHistory: '',
//       medications: '',
//       limitations: ''
//     }
//   })

//   const {
//     reset: additionalReset,
//     control: additionalControl,
//     handleSubmit: handleAdditionalSubmit,
//     formState: { errors: additionalErrors }
//   } = useForm({
//     resolver: valibotResolver(additionalInfoSchema),
//     defaultValues: {
//       instructions: '',
//       caregiverGender: '',
//       communication: '',
//       recurring: ''
//     }
//   })

//   const {
//     reset: consentReset,
//     control: consentControl,
//     handleSubmit: handleConsentSubmit,
//     formState: { errors: consentErrors }
//   } = useForm({
//     resolver: valibotResolver(consentSchema),
//     defaultValues: {
//       termsAccepted: '',
//       dataConsent: ''
//     }
//   })

//   const onSubmit = (data: any) => {
//     setFormData({ ...formData, ...data })

//     // Check if we should skip location step
//     if (activeStep === 1 && data.serviceMode === 'online') {
//       setServiceMode('online')
//       setActiveStep(3) // Skip to health info
//     } else if (activeStep === 1 && data.serviceMode === 'physical') {
//       setServiceMode('physical')
//       setActiveStep(2) // Go to location
//     } else {
//       setActiveStep(prevActiveStep => prevActiveStep + 1)
//     }

//     if (activeStep === steps.length - 1) {
//       toast.success('Form Submitted Successfully!')
//       console.log('Complete Form Data:', { ...formData, ...data })
//     }
//   }

//   const handleBack = () => {
//     // Handle back navigation with skip logic
//     if (activeStep === 3 && serviceMode === 'online') {
//       setActiveStep(1) // Skip location step when going back
//     } else {
//       setActiveStep(prevActiveStep => prevActiveStep - 1)
//     }
//   }

//   const handleReset = () => {
//     setActiveStep(0)
//     setServiceMode('')
//     setFormData({})
//     personalReset()
//     serviceReset()
//     locationReset()
//     healthReset()
//     additionalReset()
//     consentReset()
//   }

//   const renderStepContent = (activeStep: number) => {
//     switch (activeStep) {
//       case 0:
//         return (
//           <form key={0} onSubmit={handlePersonalSubmit(onSubmit)}>
//             <Grid container spacing={6}>
//               <Grid size={{ xs: 12 }}>
//                 <Typography className='font-medium' color='text.primary'>
//                   {steps[0].title}
//                 </Typography>
//                 <Typography variant='body2'>{steps[0].subtitle}</Typography>
//               </Grid>
//               <Grid size={{ xs: 12, sm: 6 }}>
//                 <Controller
//                   name='fullName'
//                   control={personalControl}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       fullWidth
//                       label='Full Name'
//                       placeholder='John Doe'
//                       error={!!personalErrors.fullName}
//                       helperText={personalErrors.fullName?.message}
//                     />
//                   )}
//                 />
//               </Grid>
//               <Grid size={{ xs: 12, sm: 6 }}>
//                 <Controller
//                   name='email'
//                   control={personalControl}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       fullWidth
//                       type='email'
//                       label='Email Address'
//                       placeholder='johndoe@gmail.com'
//                       error={!!personalErrors.email}
//                       helperText={personalErrors.email?.message}
//                     />
//                   )}
//                 />
//               </Grid>
//               <Grid size={{ xs: 12, sm: 6 }}>
//                 <Controller
//                   name='phone'
//                   control={personalControl}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       fullWidth
//                       label='Phone Number'
//                       placeholder='+92 300 1234567'
//                       error={!!personalErrors.phone}
//                       helperText={personalErrors.phone?.message}
//                     />
//                   )}
//                 />
//               </Grid>
//               <Grid size={{ xs: 12, sm: 6 }}>
//                 <Controller
//                   name='age'
//                   control={personalControl}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       fullWidth
//                       type='date'
//                       label='Date of Birth'
//                       InputLabelProps={{ shrink: true }}
//                       error={!!personalErrors.age}
//                       helperText={personalErrors.age?.message}
//                     />
//                   )}
//                 />
//               </Grid>
//               <Grid size={{ xs: 12, sm: 6 }}>
//                 <Controller
//                   name='gender'
//                   control={personalControl}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       select
//                       fullWidth
//                       label='Gender'
//                       error={!!personalErrors.gender}
//                       helperText={personalErrors.gender?.message}
//                     >
//                       <MenuItem value='male'>Male</MenuItem>
//                       <MenuItem value='female'>Female</MenuItem>
//                       <MenuItem value='other'>Other</MenuItem>
//                     </TextField>
//                   )}
//                 />
//               </Grid>
//               <Grid size={{ xs: 12, sm: 6 }}>
//                 <Controller
//                   name='language'
//                   control={personalControl}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       select
//                       fullWidth
//                       label='Preferred Language (Optional)'
//                     >
//                       <MenuItem value='english'>English</MenuItem>
//                       <MenuItem value='urdu'>Urdu</MenuItem>
//                     </TextField>
//                   )}
//                 />
//               </Grid>
//               <Grid size={{ xs: 12 }} className='flex justify-between'>
//                 <Button variant='outlined' disabled color='secondary'>
//                   Back
//                 </Button>
//                 <Button variant='contained' type='submit'>
//                   Next
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//         )
//       case 1:
//         return (
//           <form key={1} onSubmit={handleServiceSubmit(onSubmit)}>
//             <Grid container spacing={6}>
//               <Grid size={{ xs: 12 }}>
//                 <Typography className='font-medium' color='text.primary'>
//                   {steps[1].title}
//                 </Typography>
//                 <Typography variant='body2'>{steps[1].subtitle}</Typography>
//               </Grid>
//               <Grid size={{ xs: 12 }}>
//                 <Controller
//                   name='serviceMode'
//                   control={serviceControl}
//                   render={({ field }) => (
//                     <FormControl error={!!serviceErrors.serviceMode}>
//                       <FormLabel>Service Mode</FormLabel>
//                       <RadioGroup {...field} row>
//                         <FormControlLabel value='online' control={<Radio />} label='Online' />
//                         <FormControlLabel value='physical' control={<Radio />} label='Physical' />
//                       </RadioGroup>
//                       {serviceErrors.serviceMode && (
//                         <FormHelperText>{serviceErrors.serviceMode.message}</FormHelperText>
//                       )}
//                     </FormControl>
//                   )}
//                 />
//               </Grid>
//               <Grid size={{ xs: 12, sm: 6 }}>
//                 <Controller
//                   name='serviceType'
//                   control={serviceControl}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       select
//                       fullWidth
//                       label='Service Type'
//                       error={!!serviceErrors.serviceType}
//                       helperText={serviceErrors.serviceType?.message}
//                     >
//                       <MenuItem value='nursing'>Nursing</MenuItem>
//                       <MenuItem value='physiotherapy'>Physiotherapy</MenuItem>
//                       <MenuItem value='general-care'>General Care</MenuItem>
//                     </TextField>
//                   )}
//                 />
//               </Grid>
//               <Grid size={{ xs: 12, sm: 6 }}>
//                 <Controller
//                   name='urgency'
//                   control={serviceControl}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       select
//                       fullWidth
//                       label='Urgency Level'
//                       error={!!serviceErrors.urgency}
//                       helperText={serviceErrors.urgency?.message}
//                     >
//                       <MenuItem value='low'>Low</MenuItem>
//                       <MenuItem value='medium'>Medium</MenuItem>
//                       <MenuItem value='high'>High</MenuItem>
//                     </TextField>
//                   )}
//                 />
//               </Grid>
//               <Grid size={{ xs: 12 }}>
//                 <Controller
//                   name='reason'
//                   control={serviceControl}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       fullWidth
//                       multiline
//                       rows={4}
//                       label='Reason for Request'
//                       placeholder='Please describe your health concern or reason for the appointment'
//                       error={!!serviceErrors.reason}
//                       helperText={serviceErrors.reason?.message}
//                     />
//                   )}
//                 />
//               </Grid>
//               <Grid size={{ xs: 12, sm: 6 }}>
//                 <Controller
//                   name='date'
//                   control={serviceControl}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       fullWidth
//                       type='date'
//                       label='Preferred Date'
//                       InputLabelProps={{ shrink: true }}
//                       error={!!serviceErrors.date}
//                       helperText={serviceErrors.date?.message}
//                     />
//                   )}
//                 />
//               </Grid>
//               <Grid size={{ xs: 12, sm: 6 }}>
//                 <Controller
//                   name='time'
//                   control={serviceControl}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       fullWidth
//                       type='time'
//                       label='Preferred Time'
//                       InputLabelProps={{ shrink: true }}
//                       error={!!serviceErrors.time}
//                       helperText={serviceErrors.time?.message}
//                     />
//                   )}
//                 />
//               </Grid>
//               <Grid size={{ xs: 12 }}>
//                 <Controller
//                   name='duration'
//                   control={serviceControl}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       fullWidth
//                       label='Care Duration (Optional)'
//                       placeholder='e.g., 1 hour, 2 weeks, ongoing'
//                     />
//                   )}
//                 />
//               </Grid>
//               <Grid size={{ xs: 12 }} className='flex justify-between'>
//                 <Button variant='outlined' onClick={handleBack} color='secondary'>
//                   Back
//                 </Button>
//                 <Button variant='contained' type='submit'>
//                   Next
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//         )
//       case 2:
//         return (
//           <form key={2} onSubmit={handleLocationSubmit(onSubmit)}>
//             <Grid container spacing={6}>
//               <Grid size={{ xs: 12 }}>
//                 <Typography className='font-medium' color='text.primary'>
//                   {steps[2].title}
//                 </Typography>
//                 <Typography variant='body2'>{steps[2].subtitle}</Typography>
//               </Grid>
//               <Grid size={{ xs: 12 }}>
//                 <Controller
//                   name='address'
//                   control={locationControl}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       fullWidth
//                       multiline
//                       rows={3}
//                       label='Address'
//                       placeholder='Enter your full address'
//                       error={!!locationErrors.address}
//                       helperText={locationErrors.address?.message}
//                     />
//                   )}
//                 />
//               </Grid>
//               <Grid size={{ xs: 12 }}>
//                 <Controller
//                   name='apartment'
//                   control={locationControl}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       fullWidth
//                       label='Apartment / Floor / Room (Optional)'
//                       placeholder='e.g., Apt 5B, 3rd Floor'
//                     />
//                   )}
//                 />
//               </Grid>
//               <Grid size={{ xs: 12 }}>
//                 <Controller
//                   name='accessibility'
//                   control={locationControl}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       fullWidth
//                       multiline
//                       rows={3}
//                       label='Accessibility Notes (Optional)'
//                       placeholder='Any special instructions: stairs, elevator, pets, gate code, etc.'
//                     />
//                   )}
//                 />
//               </Grid>
//               <Grid size={{ xs: 12 }} className='flex justify-between'>
//                 <Button variant='outlined' onClick={handleBack} color='secondary'>
//                   Back
//                 </Button>
//                 <Button variant='contained' type='submit'>
//                   Next
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//         )
//       case 3:
//         return (
//           <form key={3} onSubmit={handleHealthSubmit(onSubmit)}>
//             <Grid container spacing={6}>
//               <Grid size={{ xs: 12 }}>
//                 <Typography className='font-medium' color='text.primary'>
//                   {steps[3].title}
//                 </Typography>
//                 <Typography variant='body2'>{steps[3].subtitle}</Typography>
//               </Grid>
//               <Grid size={{ xs: 12 }}>
//                 <Controller
//                   name='medicalHistory'
//                   control={healthControl}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       fullWidth
//                       multiline
//                       rows={4}
//                       label='Medical History / Conditions'
//                       placeholder='Please describe any medical conditions, allergies, or relevant health history'
//                       error={!!healthErrors.medicalHistory}
//                       helperText={healthErrors.medicalHistory?.message}
//                     />
//                   )}
//                 />
//               </Grid>
//               <Grid size={{ xs: 12 }}>
//                 <Controller
//                   name='medications'
//                   control={healthControl}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       fullWidth
//                       multiline
//                       rows={3}
//                       label='Current Medications'
//                       placeholder='List all medications you are currently taking'
//                       error={!!healthErrors.medications}
//                       helperText={healthErrors.medications?.message}
//                     />
//                   )}
//                 />
//               </Grid>
//               <Grid size={{ xs: 12 }}>
//                 <Controller
//                   name='limitations'
//                   control={healthControl}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       fullWidth
//                       multiline
//                       rows={3}
//                       label='Physical Limitations / Mobility Notes (Optional)'
//                       placeholder='Any physical limitations or mobility concerns'
//                     />
//                   )}
//                 />
//               </Grid>
//               <Grid size={{ xs: 12 }}>
//                 <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
//                   Upload Lab Reports / Prescriptions (Optional)
//                 </Typography>
//                 <Button variant='outlined' component='label'>
//                   Choose Files
//                   <input type='file' hidden multiple accept='.pdf,.jpg,.jpeg,.png' />
//                 </Button>
//               </Grid>
//               <Grid size={{ xs: 12 }} className='flex justify-between'>
//                 <Button variant='outlined' onClick={handleBack} color='secondary'>
//                   Back
//                 </Button>
//                 <Button variant='contained' type='submit'>
//                   Next
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//         )
//       case 4:
//         return (
//           <form key={4} onSubmit={handleAdditionalSubmit(onSubmit)}>
//             <Grid container spacing={6}>
//               <Grid size={{ xs: 12 }}>
//                 <Typography className='font-medium' color='text.primary'>
//                   {steps[4].title}
//                 </Typography>
//                 <Typography variant='body2'>{steps[4].subtitle}</Typography>
//               </Grid>
//               <Grid size={{ xs: 12 }}>
//                 <Controller
//                   name='instructions'
//                   control={additionalControl}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       fullWidth
//                       multiline
//                       rows={4}
//                       label='Special Instructions (Optional)'
//                       placeholder='Any additional information or special requests'
//                     />
//                   )}
//                 />
//               </Grid>
//               <Grid size={{ xs: 12, sm: 6 }}>
//                 <Controller
//                   name='caregiverGender'
//                   control={additionalControl}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       select
//                       fullWidth
//                       label='Preferred Caregiver Gender (Optional)'
//                     >
//                       <MenuItem value=''>No Preference</MenuItem>
//                       <MenuItem value='male'>Male</MenuItem>
//                       <MenuItem value='female'>Female</MenuItem>
//                     </TextField>
//                   )}
//                 />
//               </Grid>
//               <Grid size={{ xs: 12, sm: 6 }}>
//                 <Controller
//                   name='communication'
//                   control={additionalControl}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       select
//                       fullWidth
//                       label='Preferred Communication Channel'
//                       error={!!additionalErrors.communication}
//                       helperText={additionalErrors.communication?.message}
//                     >
//                       <MenuItem value='call'>Call</MenuItem>
//                       <MenuItem value='email'>Email</MenuItem>
//                       <MenuItem value='sms'>SMS</MenuItem>
//                       <MenuItem value='app'>App Notification</MenuItem>
//                     </TextField>
//                   )}
//                 />
//               </Grid>
//               <Grid size={{ xs: 12 }}>
//                 <Controller
//                   name='recurring'
//                   control={additionalControl}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       select
//                       fullWidth
//                       label='Recurring Appointment (Optional)'
//                     >
//                       <MenuItem value=''>One-time only</MenuItem>
//                       <MenuItem value='daily'>Daily</MenuItem>
//                       <MenuItem value='weekly'>Weekly</MenuItem>
//                       <MenuItem value='biweekly'>Bi-weekly</MenuItem>
//                       <MenuItem value='monthly'>Monthly</MenuItem>
//                     </TextField>
//                   )}
//                 />
//               </Grid>
//               <Grid size={{ xs: 12 }} className='flex justify-between'>
//                 <Button variant='outlined' onClick={handleBack} color='secondary'>
//                   Back
//                 </Button>
//                 <Button variant='contained' type='submit'>
//                   Next
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//         )
//       case 5:
//         return (
//           <form key={5} onSubmit={handleConsentSubmit(onSubmit)}>
//             <Grid container spacing={6}>
//               <Grid size={{ xs: 12 }}>
//                 <Typography className='font-medium' color='text.primary'>
//                   {steps[5].title}
//                 </Typography>
//                 <Typography variant='body2'>{steps[5].subtitle}</Typography>
//               </Grid>
//               <Grid size={{ xs: 12 }}>
//                 <Card variant='outlined' sx={{ p: 3, bgcolor: 'action.hover' }}>
//                   <Typography variant='h6' gutterBottom>
//                     Review Summary
//                   </Typography>
//                   <Divider sx={{ my: 2 }} />
//                   <Typography variant='body2' color='text.secondary'>
//                     <strong>Personal Info:</strong> {formData.fullName || 'N/A'} | {formData.email || 'N/A'}
//                   </Typography>
//                   <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
//                     <strong>Service:</strong> {formData.serviceMode || 'N/A'} | {formData.serviceType || 'N/A'}
//                   </Typography>
//                   <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
//                     <strong>Date & Time:</strong> {formData.date || 'N/A'} at {formData.time || 'N/A'}
//                   </Typography>
//                   {formData.address && (
//                     <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
//                       <strong>Location:</strong> {formData.address}
//                     </Typography>
//                   )}
//                 </Card>
//               </Grid>
//               <Grid size={{ xs: 12 }}>
//                 <Controller
//                   name='termsAccepted'
//                   control={consentControl}
//                   render={({ field }) => (
//                     <FormControl error={!!consentErrors.termsAccepted}>
//                       <FormControlLabel
//                         control={
//                           <Checkbox
//                             checked={field.value === 'true'}
//                             onChange={(e) => field.onChange(e.target.checked ? 'true' : '')}
//                           />
//                         }
//                         label='I agree to the Terms & Conditions and Privacy Policy'
//                       />
//                       {consentErrors.termsAccepted && (
//                         <FormHelperText>{consentErrors.termsAccepted.message}</FormHelperText>
//                       )}
//                     </FormControl>
//                   )}
//                 />
//               </Grid>
//               <Grid size={{ xs: 12 }}>
//                 <Controller
//                   name='dataConsent'
//                   control={consentControl}
//                   render={({ field }) => (
//                     <FormControl error={!!consentErrors.dataConsent}>
//                       <FormControlLabel
//                         control={
//                           <Checkbox
//                             checked={field.value === 'true'}
//                             onChange={(e) => field.onChange(e.target.checked ? 'true' : '')}
//                           />
//                         }
//                         label='I consent to the use of my data for healthcare purposes'
//                       />
//                       {consentErrors.dataConsent && (
//                         <FormHelperText>{consentErrors.dataConsent.message}</FormHelperText>
//                       )}
//                     </FormControl>
//                   )}
//                 />
//               </Grid>
//               <Grid size={{ xs: 12 }} className='flex justify-between'>
//                 <Button variant='outlined' onClick={handleBack} color='secondary'>
//                   Back
//                 </Button>
//                 <Button variant='contained' type='submit' color='success'>
//                   Submit
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//         )
//       default:
//         return <Typography>Unknown step</Typography>
//     }
//   }

//   return (
//     <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
//       <Card>
//         <CardContent>
//           <Stepper activeStep={activeStep}>
//             {steps.map((label, index) => {
//               // Skip location step in stepper if online mode
//               if (index === 2 && serviceMode === 'online') {
//                 return null
//               }

//               const labelProps: { error?: boolean } = {}

//               if (index === activeStep) {
//                 labelProps.error = false
//                 if (index === 0 && Object.keys(personalErrors).length > 0) labelProps.error = true
//                 if (index === 1 && Object.keys(serviceErrors).length > 0) labelProps.error = true
//                 if (index === 2 && Object.keys(locationErrors).length > 0) labelProps.error = true
//                 if (index === 3 && Object.keys(healthErrors).length > 0) labelProps.error = true
//                 if (index === 4 && Object.keys(additionalErrors).length > 0) labelProps.error = true
//                 if (index === 5 && Object.keys(consentErrors).length > 0) labelProps.error = true
//               }

//               return (
//                 <Step key={index}>
//                   <StepLabel
//                     {...labelProps}
//                     StepIconComponent={StepperCustomDot}
//                   >
//                     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
//                       <Typography variant='caption' color='text.secondary'>
//                         {`0${index + 1}`}
//                       </Typography>
//                       <Typography variant='body2' fontWeight='medium'>
//                         {label.title}
//                       </Typography>
//                       <Typography variant='caption' color='text.secondary'>
//                         {label.subtitle}
//                       </Typography>
//                     </div>
//                   </StepLabel>
//                 </Step>
//               )
//             })}
//           </Stepper>
//         </CardContent>
//         <Divider />
//         <CardContent>
//           {activeStep === steps.length ? (
//             <>
//               <Typography className='mlb-2 mli-1' variant='h6' color='success.main'>
//                 All steps are completed! Your appointment request has been submitted.
//               </Typography>
//               <Typography variant='body2' color='text.secondary' sx={{ mt: 2 }}>
//                 We will contact you shortly via your preferred communication channel.
//               </Typography>
//               <div className='flex justify-end mt-4'>
//                 <Button variant='contained' onClick={handleReset}>
//                   Submit Another Request
//                 </Button>
//               </div>
//             </>
//           ) : (
//             renderStepContent(activeStep)
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// export default StepperLinearWithValidation
