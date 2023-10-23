import s from './changeNameForm.module.scss'
import { ChangeNameValidation, useChangeName } from './useChangeName.ts'

import { ControlledTextField } from '@/components/controlls'
import { Button } from '@/components/ui'
import { useUpdateProfileInfoMutation } from '@/services/auth/authService.ts'

type Props = {
  name?: string
  setEditeMode: (value: boolean) => void
}

export const ChangeName = ({ name, setEditeMode }: Props) => {
  const [uploadPhoto] = useUpdateProfileInfoMutation()

  const { handleSubmit, errors, control, setError } = useChangeName(name)
  const onSubmit = (data: ChangeNameValidation) => {
    if (name !== data.profileName) {
      const formData = new FormData()

      formData.append('name', data.profileName)
      uploadPhoto(formData)
      setEditeMode(false)
    } else {
      setError('profileName', { message: 'this is the current name' })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.formContainer}>
      <div className={s.input}>
        <ControlledTextField
          label={'Nickname'}
          name="profileName"
          control={control}
          errorMessage={errors.profileName?.message}
        />
      </div>
      <Button className={s.submitButton}>Save Changes</Button>
    </form>
  )
}
