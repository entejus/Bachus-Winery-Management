import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import AutoLabels from "./AutoLabels";
import AutoContent from "./AutoContent";
import AutoTableStyle from '../../assets/jss/common/components/AutoTableStyle.js'
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase/InputBase";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button/Button';
import Modal from '@material-ui/core/Modal/Modal';
import Typography from '@material-ui/core/Typography/Typography';
import {FormUsers} from "../../views/common/forms/FormUsers";

const data = {
    "data": {
        "hero": [
            {
                "id": "0",
                "name": "R2-D2",
                "age": "100"
            },
            {
                "id": "1",
                "name": "R2-D3",
                "age": "120"
            }
        ]
    }
};

const subject = "hero";

class AutoTable extends React.Component {
    state = {
        querySize: 100,
        open: false,
    };

    handleChange = event => {
        if (event.target.value >= 0)
            this.setState({
                querySize: event.target.value,
            });
        if (event.target.value > 5000) {
            this.setState({
                querySize: 5000,
            });
        }
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const {classes} = this.props;
        const {querySize} = this.state;

        return (
            <React.Fragment>
                <div className={classes.actions}>
                    <TextField
                        id="querySize"
                        label="Ile wierszy na stronę"
                        value={querySize}
                        onChange={this.handleChange}
                        type="number"
                        className={classes.textField}
                        margin="normal"
                    />
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase
                            placeholder="Wyszukaj…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                        />
                    </div>
                </div>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <AutoLabels data={data} subject={subject}/>
                        <AutoContent data={data} subject={subject}/>
                    </Table>
                </Paper>
                <div className={classes.buttonDiv}>
                    <Button onClick={this.handleOpen}>Dodaj</Button>
                </div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                    className={classes.modal}
                >
                    <div className={classes.paper}>
                        <Typography variant="title" id="modal-title">
                            Formularz
                        </Typography>
                        <FormUsers/> {/*przykładowy*/}
                    </div>
                </Modal>
            </React.Fragment>
        );
    }
}


AutoTable.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    subject: PropTypes.string.isRequired,
};

export default withStyles(AutoTableStyle)(AutoTable);