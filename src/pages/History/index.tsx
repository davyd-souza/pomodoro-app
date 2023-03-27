// STYLE
import { HistoryContainer, HistoryList, Status, TableBase } from './styles'

export function History() {
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
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td>2 months ago</td>
              <td>
                <Status statusColor="finished">Finished</Status>
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td>2 months ago</td>
              <td>
                <Status statusColor="progress">In Progress</Status>
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td>2 months ago</td>
              <td>
                <Status statusColor="stopped">Stopped</Status>
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td>2 months ago</td>
              <td>
                <Status statusColor="finished">Finished</Status>
              </td>
            </tr>
          </tbody>
        </TableBase>
      </HistoryList>
    </HistoryContainer>
  )
}
