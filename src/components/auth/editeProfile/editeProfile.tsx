import { ChangeEvent, useState } from 'react'

import { ChangeName } from './changeNameForm/ChangeNameForm.tsx'
import s from './editeProfile.module.scss'
import { ProfileInfo } from './profileInfo/profileInfo'

import { Edit } from '@/assets'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

type Props = {
  name: string
  email: string
  src?: string
  changePhoto: (photo: string | ArrayBuffer) => void
  onLogOut?: () => void
}

export const EditeProfile = ({ name, email, src, changePhoto, onLogOut }: Props) => {
  const [editeMode, setEditeMode] = useState(false)

  const changePhotoHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : ''

    if (selectedFile) {
      const reader = new FileReader()

      reader.onload = e => {
        const uploadedFile = e.target?.result

        if (uploadedFile) {
          // console.log('Данные файла:', uploadedFile)
          changePhoto(uploadedFile)
        }
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  return (
    <Card className={s.container}>
      <Typography variant="h1" as="h1" className={s.title}>
        Personal Information
      </Typography>
      <div className={s.avatarContainer}>
        {src && <img src={src} alt={'img'} className={s.img} />}
        {!src && (
          <label htmlFor={'avatarId'} className={s.defaultAvatar}>
            <span>{name?.[0]}</span>
          </label>
        )}

        {!editeMode && (
          <label htmlFor={'avatarId'} className={s.edit}>
            <Edit />
            <input
              id="avatarId"
              type={'file'}
              className={s.inputFile}
              onChange={changePhotoHandler}
            />
          </label>
        )}
      </div>
      {!editeMode && (
        <ProfileInfo name={name} email={email} setEditeMode={setEditeMode} onLogOut={onLogOut} />
      )}
      {editeMode && <ChangeName name={name} setEditeMode={setEditeMode} />}
    </Card>
  )
}
