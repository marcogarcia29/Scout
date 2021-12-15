import React, { useState } from 'react'
import { Container, TextField, Button, Typography } from '@mui/material'

function Scout({ aoEnviar }) {
  const [nome, setNome] = useState('')
  const [acao, setAcao] = useState('')
  const [timestamp, setTimestamp] = useState('')

  return (
    <>
      <Container component="main" maxWidth="xs">
        <form
          onSubmit={event => {
            event.preventDefault()
            aoEnviar({ nome, acao, timestamp })
          }}
        >
          <Typography variant="h4" component="h3" align="center">
            Formulario de Ação
          </Typography>
          <TextField
            value={nome}
            onChange={event => {
              setNome(event.target.value)
            }}
            id="nome"
            label="Nome do Jogador"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            value={acao}
            onChange={event => {
              setAcao(event.target.value)
            }}
            id="acao"
            label="Ação do Jogador"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            value={timestamp}
            onChange={event => {
              setTimestamp(event.target.value)
            }}
            id="timestamp"
            label="Timestamp"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Button
            aoEnviar={aoEnviarForm}
            variant="outlined"
            color="primary"
            type="submit"
            fullWidth
            margin="normal"
          >
            Cadastrar Ação
          </Button>
        </form>
      </Container>
    </>
  )
}

function aoEnviarForm(dados) {
  console.log(dados)
}

export { Scout }
