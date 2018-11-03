import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withStyles} from '@material-ui/core/styles';
import ScrollableModalFormStyle from '../../assets/jss/common/components/ScorllableDialogFormStyle.js';
import Button from '@material-ui/core/Button/Button';

class ScrollableDialogForm extends React.Component {

    state = {
        open: false,
    };

    handleClose = () => {
        this.setState({open: false});
        this.props.onClose();
    };

    handleSumbit = () => {
        this.handleClose();
    };


    render() {
        const {classes, children, isOpen, dialogTitle} = this.props;

        return (
            <Dialog
                aria-labelledby="modal-form-popup"
                aria-describedby="modal-form-popup"
                open={isOpen}
                onClose={this.handleClose}
                className={classes.dialog}
                scroll="body"
                fullWidth={true}
                maxWidth={"lg"}
            >
                <DialogContent>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={this.handleClose} color="secondary">
                        Anuluj
                    </Button>
                    <Button variant="contained" onClick={this.handleSumbit} color="primary">
                        Zapisz
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

}

ScrollableDialogForm.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    isOpen: PropTypes.bool.isRequired,
    dialogTitle: PropTypes.string.isRequired,
};

export default withStyles(ScrollableModalFormStyle)(ScrollableDialogForm);