import React, { useState, useRef, useContext, useEffect } from 'react'
import {
  Container,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  useTheme
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import ReactPlayer from 'react-player'
import TeamContext from './TeamContext'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #fafafa 30%, #fefefe 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 255, 255, .3)',
    color: 'rgba(110, 189, 32, 0.521)',
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

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 100,
      fontFamily: 'Inconsolata'
    }
  }
}

const namesAction = ['Passe', 'Gol', 'Cartão Amarelo']

function getStyles(name, acao, theme) {
  return {
    fontWeight:
      acao.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  }
}

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
  const { players } = useContext(TeamContext)
  const theme = useTheme()
  const [acao, setAcao] = useState('')
  const handleChange = event => {
    const {
      target: { value }
    } = event
    setAcao(value)
  }
  const handlePlayers = event => {
    const {
      target: { value }
    } = event
    setNome(value)
  }

  const [nome, setNome] = useState('')
  const [namePlayers, setNamePlayers] = useState([])

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

  //  const playerName = JSON.parse(localStorage.getItem('players'))

  const addAcao = event => {
    event.preventDefault()
    const playerAcao = JSON.parse(localStorage.getItem('Actions'))
    if (nome !== '' && acao !== '') {
      if (playerAcao != null) {
        playerAcao.push({ nome, acao, time: pegarTempo() })
        localStorage.setItem('Actions', JSON.stringify(playerAcao))
      } else {
        localStorage.setItem(
          'Actions',
          JSON.stringify([{ nome, acao, time: pegarTempo() }])
        )
      }
      setAcao('')
    }
  }

  useEffect(() => {
    let players = JSON.parse(localStorage.getItem('players'))
    if (players) {
      setNamePlayers(players)
    }
  }, [])

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
            controls="true"
            width="100%"
            height="260px"
          />
        ) : (
          <h1>{url.message}</h1>
        )}

        <form onSubmit={addAcao}>
          <Select
            displayEmpty
            fullWidth
            onChange={handlePlayers}
            value={nome}
            renderValue={selected => {
              if (selected.length === 0) {
                return <em>Nome do Jogador</em>
              }
              return selected
            }}
          >
            <MenuItem value={''}>Selecione um nome:</MenuItem>
            {namePlayers.map(player => (
              <MenuItem key={player.name} value={player.name}>
                {player.name}
              </MenuItem>
            ))}
          </Select>
          <Select
            displayEmpty
            fullWidth
            value={acao}
            onChange={handleChange}
            renderValue={selected => {
              if (selected.length === 0) {
                return <em>Ação do Jogador</em>
              }
              return selected
            }}
            MenuProps={MenuProps}
          >
            <MenuItem value={''}>Selecione a ação do jogador:</MenuItem>
            {namesAction.map(name => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, acao, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
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
      <Link to="/stats">
        <button className="createTeamBtn">
          VISUALIZAR ESTASTÍSTICAS DOS JOGADORES
        </button>
      </Link>
    </>
  )
}

export { Scout }
