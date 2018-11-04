import React from 'react';
import { Grid, InputAdornment, MenuItem, Paper, TextField, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { FormUsers } from './FormUsers';

const odmiany = ['Agat doński', 'Ajwaz', 'Alden'];

const stany = ['czynna', 'rośnie'];

export class FormVineyard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      area: null,
      terroir: '',
      dateOfPlanting: '',
      registrationPlotId: '',
      grapeType: '',
      state: ''
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = () => {
    const { name, area, terroir, dateOfPlanting, registrationPlotId, grapeType, state } = this.state;
    this.props.onSubmit({
      name,
      area,
      terroir,
      dateOfPlanting,
      registrationPlotId,
      grapeType,
      state
    });
    this.props.formSubmitted();
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.submitFromOutside && this.props.submitFromOutside) {
      this.handleSubmit();
    }
  }

  render() {
    const { name, area, terroir, dateOfPlanting, registrationPlotId, grapeType, state } = this.state;

    return (
      <Paper style={{ margin: '2% 20%' }}>
        <Typography variant={'h6'} align={'center'}>
          Nowa winnica
        </Typography>
        <form style={{ margin: '0% 25%' }}>
          <Grid container spacing={8} justify={'center'}>
            <Grid item md={6}>
              <TextField
                fullWidth
                id="name"
                label="Nazwa winnicy"
                placeholder="Nazwa"
                value={name}
                margin="dense"
                onChange={this.handleChange('name')}
                variant={'outlined'}
                inputProps={{
                  maxLength: '40'
                }}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
                id="area"
                label="Powierzchnia"
                value={area}
                type="number"
                margin="dense"
                onChange={this.handleChange('area')}
                variant={'outlined'}
                InputProps={{
                  startAdornment: <InputAdornment position="start">Ha</InputAdornment>
                }}
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                fullWidth
                id="state"
                select
                label="Stan winnicy"
                placeholder="Stan winnicy"
                value={state}
                onChange={this.handleChange('state')}
                margin="dense"
                variant={'outlined'}
              >
                {stany.map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item md={12}>
              <TextField
                fullWidth
                id="terroir"
                label="Terroir"
                placeholder="Terroir"
                value={terroir}
                multiline
                margin="dense"
                onChange={this.handleChange('terroir')}
                variant={'outlined'}
                inputProps={{
                  maxLength: '255'
                }}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
                id="dateOfPlanting"
                label="Data zasadzenie"
                type="date"
                value={dateOfPlanting}
                InputLabelProps={{
                  shrink: true
                }}
                margin="dense"
                onChange={this.handleChange('dateOfPlanting')}
                variant={'outlined'}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
                id="registrationPlotId"
                label="Ewidencyjny numer działki"
                placeholder="Nr. działki"
                value={registrationPlotId}
                margin="dense"
                onChange={this.handleChange('registrationPlotId')}
                variant={'outlined'}
                inputProps={{
                  maxLength: '45'
                }}
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                fullWidth
                id="grapeType"
                select
                label="Odmiana winogron"
                placeholder="Odmiana winogron"
                value={grapeType}
                onChange={this.handleChange('grapeType')}
                margin="dense"
                variant={'outlined'}
              >
                {odmiany.map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </form>
      </Paper>
    );
  }
}

FormUsers.propTypes = {
  submitFromOutside: PropTypes.bool,
  onSubmit: PropTypes.func,
  formSubmitted: PropTypes.func
};
