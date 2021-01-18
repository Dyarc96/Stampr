import React from 'react';
import { useTable, usePagination } from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faUserCheck, faUserMinus, faAward, faStamp } from '@fortawesome/free-solid-svg-icons';
import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { ChevronButton, ActionsContainer } from './style';

export const Table = ({ 
  columns,
  data,
  showModal,
  awardUser,
  rejectCandidate,
  acceptCandidate,
  type,
  numOfStamps }) => {
    
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page,
      canPreviousPage,
      canNextPage,
      pageOptions,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize },
    } = useTable(
      {
        columns,
        data,
        initialState: { pageIndex: 0, pageSize: 5},
      },
      usePagination
    )

    return (
      <>
        <MaUTable {...getTableProps()}>
          <TableHead>
            {headerGroups.map(headerGroup => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <TableCell {...column.getHeaderProps()}>{column.render('Header')}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row)
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    if(cell.column.Header === 'Akcje') {
                      if(type === 'client') {
                        return <TableCell {...cell.getCellProps()}>
                          <ActionsContainer>
                            {
                              cell.row.original.stamps >= numOfStamps &&
                                <FontAwesomeIcon size="2x" icon={faAward}
                                  onClick={() => awardUser(cell.row.original._id)}/>
                            }
                            <FontAwesomeIcon size="2x" icon={faStamp} onClick={() => {
                              showModal(cell.row.original._id)
                            }}/>
                          </ActionsContainer>
                        </TableCell>
                      } else if (type === 'candidate') {
                        return <TableCell {...cell.getCellProps()}>
                          <FontAwesomeIcon size="2x" icon={faUserCheck}
                            onClick={() => acceptCandidate(cell.row.original)}/>
                          <FontAwesomeIcon size="2x" icon={faUserMinus} onClick={() =>
                            rejectCandidate(cell.row.original._id)}/>
                        </TableCell>
                      } else {
                        return <TableCell {...cell.getCellProps()}>
                          <FontAwesomeIcon size="2x" icon={faUserMinus}/>
                        </TableCell>
                      }
                    } else {
                      return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                    }
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </MaUTable>
        <div className="pagination">
            <div className="pagination__rows">
            <div>Liczba rekordów na stronie:</div>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={pageSize}
                onChange={e => setPageSize(Number(e.target.value))}>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
            </Select>
        </div>
        <span className="pagination__page">
            Strona{' '}
              {pageIndex + 1} z {pageOptions.length}
            {' '}
          </span>
          <div className="pagination__controls">
            <ChevronButton onClick={() => previousPage()} disabled={!canPreviousPage}>
              <FontAwesomeIcon icon={faChevronLeft}/>
            </ChevronButton>{' '}
            <ChevronButton onClick={() => nextPage()} disabled={!canNextPage}>
              <FontAwesomeIcon icon={faChevronRight}/>
            </ChevronButton>{' '}
          </div>
        </div>
      </>
    )
  }