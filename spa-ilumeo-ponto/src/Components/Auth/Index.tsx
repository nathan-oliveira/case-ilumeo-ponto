import React from 'react'
import './index.css'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUserCode } from '../../Store/user'

import useForm from '../../Hooks/useForm';

import Input from '../Templates/Form/Input/Index';
import Row from '../Templates/Form/Row/Index';
import Grid from '../Templates/Form/Grid/Index';
import Button from '../Templates/Form/Button/Index';

import SnackbarMessage from '../Templates/SnackbarMessage/Index';

const Auth = () => {
  const userCode = useForm({ codeUserFormat: true });
  const [messageToSnackbar, setMessageToSnackbar] = React.useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(event: any) {
    event.preventDefault();

    if (userCode.validate()) {
      dispatch(setUserCode(userCode.value));
      navigate('/');
    }
  }

  return (
    <section className="form-section">
      <form onSubmit={handleSubmit} autoComplete="off" className="form-auth">
        <Row>
          <h1 className="form-auth--title">Ponto <b>Ilumeo</b></h1>
        </Row>

        <Row classRow="mt-4">
          <Grid cols="12">
            <Input
              label="Código do usuário"
              type="text"
              name="name"
              max={20}
              {...userCode}
            />
          </Grid>
        </Row>

        <Row classRow="mt-1">
          <Button>Confirmar</Button>
        </Row>

        <SnackbarMessage
          active={!!messageToSnackbar}
          message={messageToSnackbar}
          handlerClose={() => setMessageToSnackbar('')}
        />
      </form>
    </section>
  )
}

export default Auth;
