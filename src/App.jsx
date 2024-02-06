import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver} from '@hookform/resolvers/yup'

function App() {
  const yupSchema = yup.object({
    name: yup.string().required('le champs est obligatoire')
    .min(2, 'Trop court !').max(5, 'trop long !'),
    age:  yup.number().typeError('Veuillez rentrer un nombre !').min(18, 'Trop jeune !'),
    password: yup.string()
    .required('mot de passe obligatoire !')
    .min(5,'Mot de passe trop court !')
    .max(10, 'Mot de passe trop long !'),
    confirmPassword: yup
    .string()
    .required('veuillez confirmer votre mot de passe')
    .oneOf(
      [yup.ref("password"), ""],
      "Les mots de passe ne correspondent pas !")
  })
  const { register, handleSubmit, getValues, watch, formState: {errors} } 
    = useForm({
    resolver: yupResolver(yupSchema),
    mode: "onSubmit"
  });
  function submit(values) {
    console.log(values);
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ backgroundColor: '#fefefe', height: '100vh', width: '100%' }}
    >
      <form onSubmit={handleSubmit(submit)}>
        <div className="d-flex flex-column mb-20">
          <label htmlFor="name" className="mb-5">
            Nom
          </label>
          <input
            id="name"
            type="text"
            {...register('name', {
              disabled: false,
              required: 'Le champ est obligatoire',
              maxLength: { value: 25, message: 'Trop long !' },
              minLength: { value: 2, message: 'Trop court !' },
              validate(value) {
                if (value === 'Jean') {
                  return true;
                } else {
                  return 'Mauvais prénom';
                }
              },
            })}
          />
          {errors?.name && (
            <p style={{ color: 'red' }}>{errors.name.message}</p>
          )}
        </div>

        <div className="d-flex flex-column mb-20">
          <label htmlFor="name" className="mb-5"> Age </label>
          <input id="age" type="number"
          {...register('age', {valueAsNumber: true,required: 'Champ requis'})}/>
          {errors?.age && <p style={{ color: 'red' }}>{errors.age.message}</p>}
        </div>

        <div className="d-flex flex-column mb-20">
          <label htmlFor="password" className="mb-5"> Mot de passe </label>
          <input id="password" type="password"
          {...register('password', {valueAsNumber: true,required: 'Champ requis'})}/>
          {errors?.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </div>

          <div className="d-flex flex-column mb-20">
          <label htmlFor="confirmPassword" className="mb-5"> Confirmation de mot de passe </label>
          <input id="confirmPassword" type="password"
          {...register('confirmPassword', {valueAsNumber: true,required: 'Champ requis'})}/>
          {errors?.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword.message}</p>}
        </div>

        <button className="btn btn-primary">Sauvegarder</button>
      </form>
    </div>
  );
}
export default App;
