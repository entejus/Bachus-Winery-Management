import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableRow from '@material-ui/core/TableRow/TableRow';
import Button from '@material-ui/core/Button/Button';
import DatetimeFields from '../../variables/DateFields/DatetimeFields';
import convertDatetime from '../../functions/convertDatetime';

//values changed to entries
//value changed to entrie

const AutoContent = props => {
  let row = [];
  //previous
  // props.queryData['data'][props.querySubject]
  props.queryData
    .slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage)
    .map(currElement => {
      let entries = Object.entries(currElement);
      //deleting __typename field
      entries.pop();
      let cells = [];
      for (let entrie in entries) {
        let value = entries[entrie][1];
        if (DatetimeFields.includes(entries[entrie][0])) {
          value = convertDatetime(value);
        }
        let uniqueCellID = entries[0][1] + 'cell' + entrie;
        cells.push(<TableCell key={uniqueCellID}> {value} </TableCell>);
      }
      row.push(
        <TableRow key={entries[0][1]}>
          {cells}
          {props.editMode && (
            <TableCell numeric>
              <Button
                mini
                onClick={() => {
                  props.handleEdit(entries[0][1]);
                }}
              >
                Edytuj
              </Button>
              <Button
                mini
                onClick={() => {
                  props.handleDeletion(entries[0][1]);
                }}
              >
                USUŃ
              </Button>
            </TableCell>
          )}
        </TableRow>
      );
    });
  return row;
};

AutoContent.propTypes = {
  //previous
  // queryData: PropTypes.object.isRequired,
  queryData: PropTypes.array.isRequired,
  //querySubject: PropTypes.string.isRequired,
  editMode: PropTypes.bool.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDeletion: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

export default AutoContent;
