import Toast from 'react-bootstrap/Toast';
import React from 'react';
import PropTypes from 'prop-types';

class ErrorToast extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { message } = this.props;
    const { show } = this.props;
    return (
      <div>
        <Toast show={show} onClose={this.props.onClose}>
          <Toast.Header>
            {/* <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" /> */}
            <strong className="mr-auto">Message</strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </div>
    );
  }
}

ErrorToast.propTypes = {
  message: PropTypes.string,
  show: PropTypes.bool,
  onClose: PropTypes.func
};

export default ErrorToast;