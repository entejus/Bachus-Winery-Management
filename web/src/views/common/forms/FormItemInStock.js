import React from 'react';
import { Grid, MenuItem, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import currentDate from './CurrentDate';

import { data } from './StaticData';
import { DialogForForm } from './DialogForForm';
import SelectableAutoTable from '../../../components/SelectableAutoTable/SelectableAutoTable';
import UniversalValidationHandler from "./UniversalValidationHandler/UniversalValidationHandler";
import {itemInStockValidationKeys} from "./UniversalValidationHandler/validationKeys/validationKeys";

const errorMap = {
  name: false,
  desc: false,
  amount: false,
  barcode: false,
  actualState: false,
  acceptanceDate: false,
  releaseDate: false,
  sectorName: false,
  category: false
};

export class FormItemInStock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      desc: '',
      amount: '',
      barcode: '',
      actualState: '',
      acceptanceDate: currentDate('dateTime'),
      releaseDate: currentDate('dateTime'),
      sectorName: '',
      category: '',
      batch: {},
      open: false,
      error: errorMap
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  handleSelectBatch = (name, batch) => {
    this.setState({
      [name]: batch
    });
  };

  handleClickOpen = name => {
    this.setState({ [name]: true });
  };

  handleClose = name => {
    this.setState({ [name]: false });
  };

  handleSubmit = () => {
    const {
      name,
      desc,
      amount,
      barcode,
      actualState,
      acceptanceDate,
      releaseDate,
      sectorName,
      category,
      batch
    } = this.state;
      let dataObject = {
          name,
          desc,
          amount,
          barcode,
          actualState,
          acceptanceDate,
          releaseDate,
          sectorName,
          category,
          batch
      };

      let arrayOfErrors = UniversalValidationHandler(dataObject, itemInStockValidationKeys);
      if (arrayOfErrors.length === 0) {
          if (this.props.onSubmit(dataObject)) this.props.formSubmitted();
      } else{
          let error = Object.assign({}, errorMap);
          for (let errorField in arrayOfErrors) {
              error[arrayOfErrors[errorField]] = true;
          }
          this.setState({error: error});
          this.props.submitAborted();
      }
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.submitFromOutside && this.props.submitFromOutside) {
      this.handleSubmit();
    }
  }

  render() {
    const { name, desc, amount, acceptanceDate, releaseDate, sectorName, category, batch, open, error } = this.state;

    return (
      <form style={{ margin: '0% 25%' }}>
        <Grid container spacing={8} justify={'center'}>
          <Grid item md={12}>
            <TextField
              fullWidth
              error={error.name}
              id="name"
              label="Nazwa"
              placeholder="Nazwa"
              value={name}
              onChange={this.handleChange('name')}
              margin="dense"
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              error={error.desc}
              id="desc"
              label="Opis"
              value={desc}
              margin="dense"
              onChange={this.handleChange('desc')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              error={error.amount}
              id="amount"
              label="Ilość"
              value={amount}
              margin="dense"
              type="number"
              onChange={this.handleChange('amount')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              error={error.acceptanceDate}
              id="acceptanceDate"
              label="Data przyjęcia"
              type="datetime-local"
              value={acceptanceDate}
              InputLabelProps={{
                shrink: true
              }}
              margin="dense"
              onChange={this.handleChange('acceptanceDate')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              error={error.releaseDate}
              id="releaseDate"
              label="Data wydania"
              type="datetime-local"
              value={releaseDate}
              InputLabelProps={{
                shrink: true
              }}
              margin="dense"
              onChange={this.handleChange('releaseDate')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              error={error.sectorName}
              id="sectorName"
              label="Nazwa sektora"
              value={sectorName}
              margin="dense"
              onChange={this.handleChange('sectorName')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              error={error.category}
              id="category"
              label="Kategoria"
              select
              value={category}
              margin="dense"
              onChange={this.handleChange('category')}
              variant={'outlined'}
            >
              {data.data.dictCategories.map(option => (
                <MenuItem key={option.name} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              id="batch"
              label="Partia"
              value={batch.name ? batch.name : 'Nie wybrano partii'}
              margin="dense"
              variant="outlined"
              InputProps={{
                readOnly: true
              }}
              onClick={() => this.handleClickOpen('open')}
            />
            <DialogForForm
              title={'Partie'}
              open={open}
              onClose={() => this.handleClose('open')}
              children={
                <SelectableAutoTable
                  queryData={data}
                  querySubject="batches"
                  funParam="batch"
                  onSelect={this.handleSelectBatch}
                  onClose={() => this.handleClose('open')}
                  id={batch.id}
                />
              }
            />
          </Grid>
        </Grid>
      </form>
    );
  }
}

FormItemInStock.propTypes = {
  submitFromOutside: PropTypes.bool,
  onSubmit: PropTypes.func,
  formSubmitted: PropTypes.func,
  submitAborted: PropTypes.func
};
