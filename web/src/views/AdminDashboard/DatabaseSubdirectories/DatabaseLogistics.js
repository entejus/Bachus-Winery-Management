import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
//import BackupStyle from "../../assets/jss/common/views/Database/BackupStyle.js";
import AdminDashboardStyle from '../../../assets/jss/common/views/AdminDashboard/AdminDashboardStyle.js';
import AutoTable from '../../../components/AutoTable/AutoTable';
import OCBigTab from '../../../components/Tab/OCBigTab.js';
import TabContainer from '../../../components/Tab/TabContainer';
import { Query } from 'react-apollo';
import getItemsInStock from '../../../queries/WarehouseQueries/getItemsInStock';
import getParcels from '../../../queries/WaybillQueries/getParcels';
import getWaybills from '../../../queries/WaybillQueries/getWaybills';
import getWarehouses from '../../../queries/WarehouseQueries/getWarehouses';
import getDictCategories from '../../../queries/DictionaryQueries/getDictCategories';
import CircularProgress from '@material-ui/core/es/CircularProgress/CircularProgress';
import { FormWaybill } from '../../common/forms/FormWaybill';
import { FormItemInStock } from '../../common/forms/FormItemInStock';
import { FormWarehouse } from '../../common/forms/FormWarehouse';
import { FormDictCategories } from '../../common/forms/FormDictCategories';

const labels = ['Pozycje w magazynie', 'Przesyłki', 'Listy przwozowe', 'Magazyny', 'Słowniki'];

class DatabaseProduction extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Typography variant="h4" gutterBottom component="h2">
          Baza danych: Systemy wspomagania logistycznego
        </Typography>
        <OCBigTab labels={labels}>
          <TabContainer>
            <Typography variant="h5" gutterBottom component="h1">
              Pozycje w magazynie
            </Typography>
            <Query query={getItemsInStock}>
              {({ loading, error, data }) => {
                if (loading) return <CircularProgress />;
                if (error)
                  return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
                return (
                  <AutoTable
                    key={1}
                    query={getItemsInStock}
                    queryData={data.PozycjaWMagazynie}
                    querySize={data.PozycjaWMagazynie.length}
                    dialogForm={<FormItemInStock />}
                    dialogFormTitle={'Pozycja w magazynie'}
                    editMode={true}
                    showDetails={false}
                  />
                );
              }}
            </Query>
          </TabContainer>
          <TabContainer>
            <Typography variant="h5" gutterBottom component="h1">
              Przesyłki
            </Typography>
            <Query query={getParcels}>
              {({ loading, error, data }) => {
                if (loading) return <CircularProgress />;
                if (error)
                  return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
                let parcel = data.Przesylka;
                return <AutoTable
                  key={2}
                  queryData={parcel} querySize={parcel.length} editMode={false} />;
              }}
            </Query>
          </TabContainer>
          <TabContainer>
            <Typography variant="h5" gutterBottom component="h1">
              Listy przwozowe
            </Typography>
            <Query query={getWaybills}>
              {({ loading, error, data }) => {
                if (loading) return <CircularProgress />;
                if (error)
                  return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
                return (
                  <AutoTable
                    query={getWaybills}
                    queryData={data.ListPrzewozowy}
                    querySize={data.ListPrzewozowy.length}
                    dialogForm={<FormWaybill />}
                    dialogFormTitle={'List przewozowy'}
                    editMode={true}
                    showDetails={true}
                  />
                );
              }}
            </Query>
          </TabContainer>
          <TabContainer>
            <Typography variant="h5" gutterBottom component="h1">
              Magazyny
            </Typography>
            <Query query={getWarehouses}>
              {({ loading, error, data }) => {
                if (loading) return <CircularProgress />;
                if (error)
                  return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
                return (
                  <AutoTable
                    query={getWarehouses}
                    queryData={data.Magazyn}
                    querySize={data.Magazyn.length}
                    dialogForm={<FormWarehouse />}
                    dialogFormTitle={'Magazyn'}
                    editMode={true}
                    showDetails={true}
                  />
                );
              }}
            </Query>
          </TabContainer>
          <TabContainer>
            <Typography variant="h4" gutterBottom component="h1">
              Słowniki
            </Typography>
            <Typography variant="h5" gutterBottom component="h1">
              Kategorie przedmiotów w magazynie
            </Typography>
            <Query query={getDictCategories}>
              {({ loading, error, data }) => {
                if (loading) return <CircularProgress />;
                if (error)
                  return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
                return (
                  <AutoTable
                    query={getDictCategories}
                    queryData={data.DictKategorie}
                    querySize={data.DictKategorie.length}
                    dialogForm={<FormDictCategories />}
                    dialogFormTitle={'Kategoria przedmiotu w magazynie'}
                    editMode={true}
                    showDetails={false}
                  />
                );
              }}
            </Query>
          </TabContainer>
        </OCBigTab>
      </React.Fragment>
    );
  }
}

DatabaseProduction.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(AdminDashboardStyle)(DatabaseProduction);
