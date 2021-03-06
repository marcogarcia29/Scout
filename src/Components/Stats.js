import React, { useContext } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Lottie from 'react-lottie'
import animationData from '../lotties/kiss-of-the-heart'
import TeamContext from './TeamContext'

function Stats() {
  const { players } = useContext(TeamContext)
  const cardAcao = JSON.parse(localStorage.getItem('Actions'))
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  if (cardAcao == null) {
    return (
      <div>
        <Lottie options={defaultOptions} height={400} width={400} />
        <h1>Nenhum jogador encontrado!</h1>
      </div>
    )
  } else {
    return (
      <div>
        <h1>Stats Scout</h1>
        <>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center">Nome</TableCell>
                  <TableCell align="center">Ação</TableCell>
                  <TableCell align="center">Tempo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cardAcao.map(action => (
                  <TableRow
                    key={action}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center">{action.nome}</TableCell>
                    <TableCell align="center">{action.acao}</TableCell>
                    <TableCell align="center">{action.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      </div>
    )
  }
}
export { Stats }
