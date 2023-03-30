// DEPENDENCY
import { useContext } from 'react'
import dayjs from 'dayjs'

// STYLE
import { HistoryContainer, HistoryList, Status, TableBase } from './styles'

// CONTEXT
import { CountdownContext } from '../../contexts/CountdownContext'

export function History() {
  const { countdowns } = useContext(CountdownContext)

  return (
    <HistoryContainer>
      <h2>My history</h2>

      <HistoryList>
        <TableBase>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Start</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {countdowns.map((countdown) => (
              <tr key={countdown.id}>
                <td>{countdown.task}</td>
                <td>{countdown.minutesAmount} minutes</td>
                <td
                  title={dayjs(countdown.startDate).format(
                    'MMMM DD[,] YYYY [at] hh[:]mmA',
                  )}
                >
                  {dayjs(countdown.startDate).fromNow()}
                </td>
                <td>
                  {countdown.finishedDate && (
                    <Status statusColor="finished">Finished</Status>
                  )}

                  {countdown.interruptedDate && (
                    <Status statusColor="interrupted">Interrupted</Status>
                  )}

                  {!countdown.finishedDate && !countdown.interruptedDate && (
                    <Status statusColor="progress">In Progress</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </TableBase>
      </HistoryList>
    </HistoryContainer>
  )
}
