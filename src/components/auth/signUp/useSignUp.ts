import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string(),
  })
  .refine(values => values.password === values.confirmPassword, {
    message: 'Password не совпадает блеать',
    path: ['confirmPassword'],
  })

type FormValue = z.infer<typeof signUpSchema>
export const useSignUp = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValue>({
    resolver: zodResolver(signUpSchema),
  })

  return {
    handleSubmit,
    control,
    errors,
  }
}