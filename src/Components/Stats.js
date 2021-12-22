import React from 'react'
import './Stats.css'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

function Stats() {
  const cardAcao = JSON.parse(localStorage.getItem('Acao'))

  return (
    <div>
      <h1>Stats Scout</h1>
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
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

export { Stats }
