import React, { useState, useRef } from 'react'
import { Container, TextField, Button, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import ReactPlayer from 'react-player'

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #fafafa 30%, #fefefe 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 255, 255, .3)',
    color: '#fafafa',
    height: 48,
    padding: '0 30px'
  },

  container: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: '30px',
    color: 'black',
    marginTop: '10vh',
    display: 'flex'
  },

  input: {
    margin: '10px'
  }
})

function converterTempo(tempo) {
  let horas = Math.floor(tempo / 3600)
  let minutos = Math.floor((tempo - horas * 3600) / 60)
  let segundos = Math.floor(tempo % 60)

  if (horas < 10) horas = '0' + horas
  if (minutos < 10) minutos = '0' + minutos
  if (segundos < 10) segundos = '0' + segundos

  return horas + ':' + minutos + ':' + segundos
}

function Scout() {
  const [nome, setNome] = useState('')
  const [acao, setAcao] = useState('')
  const [url, setUrl] = useState({
    error: true,
    message: 'Nenhum vídeo carregado!',
    url: ''
  })
  const [sourceVideo, setSourceVideo] = useState('')
  const classes = useStyles()
  const videoRef = useRef(null)

  function pegarTempo() {
    if (videoRef.current === null) return null
    return converterTempo(videoRef.current.getCurrentTime())
  }

  const addAcao = event => {
    event.preventDefault()
    const playerAcao = JSON.parse(localStorage.getItem('Acao'))
    if (playerAcao != null) {
      playerAcao.push({ nome, acao, time: pegarTempo() })
      localStorage.setItem('Acao', JSON.stringify(playerAcao))
    } else {
      localStorage.setItem(
        'Acao',
        JSON.stringify([{ nome, acao, time: pegarTempo() }])
      )
    }
    setAcao('')
  }

  return (
    <>
      <Container className={classes.container} component="main" maxWidth="xs">
        <Typography variant="h4" component="h3" align="center">
          Formulario de Ação
        </Typography>
        <form>
          <TextField
            className={classes.input}
            value={sourceVideo}
            onChange={event => {
              setSourceVideo(event.target.value)
            }}
            id="acao"
            label="URL do vídeo"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Button
            className={classes.root}
            variant="outlined"
            color="primary"
            type="button"
            onClick={() => setUrl({ ...url, error: false, url: sourceVideo })}
            fullWidth
            margin="normal"
          >
            Pesquisar vídeo
          </Button>
        </form>
        {!url.error ? (
          <ReactPlayer
            onError={error =>
              setUrl({
                ...url,
                message: 'Vídeo não carregado!',
                url: undefined,
                error: true
              })
            }
            ref={videoRef}
            url={url.url}
            width="100%"
            height="260px"
          />
        ) : (
          <h1>{url.message}</h1>
        )}

        <form onSubmit={addAcao}>
          <TextField
            className={classes.input}
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
            className={classes.input}
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
          <Button
            onClick={pegarTempo}
            className={classes.root}
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

export { Scout }
