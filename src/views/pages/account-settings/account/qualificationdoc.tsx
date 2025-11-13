'use client'

import { useState } from 'react'
import type { ChangeEvent } from 'react' // Original

// MUI Imports
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import FormHelperText from '@mui/material/FormHelperText'

export type QualificationStepProps = {
  onFileChange?: (file: File | null) => void
}

const QualificationStep = ({ onFileChange }: QualificationStepProps) => {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (!files || files.length === 0) {
      setFile(null)
      onFileChange?.(null)

      return
    }

    const uploaded = files[0]

    // Optional validation
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/png',
      'image/jpeg'
    ]

    if (!allowedTypes.includes(uploaded.type)) {
      setError('Invalid file type. Please upload PDF, DOC/DOCX, JPG, or PNG.')
      setFile(null)
      onFileChange?.(null)

      return
    }

    if (uploaded.size > 10 * 1024 * 1024) {
      setError('File must be smaller than 10 MB.')
      setFile(null)
      onFileChange?.(null)

      return
    }

    setError(null)
    setFile(uploaded)
    onFileChange?.(uploaded)
  }

  return (
    <div>
      <Typography className='font-medium mbs-2' color='text.primary'>
        All Qualification Document (Nurse / Physio)
      </Typography>

      <Button component='label' variant='contained' sx={{ textTransform: 'none' }}>
        Upload
        <input hidden type='file' accept='.pdf,.doc,.docx,.jpg,.jpeg,.png' onChange={handleFileChange} />
      </Button>

      {file && (
        <Typography variant='body2' sx={{ mt: 1 }}>
          Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
        </Typography>
      )}

      {error && (
        <FormHelperText error sx={{ mt: 1 }}>
          {error}
        </FormHelperText>
      )}
    </div>
  )
}

export default QualificationStep
