import PropTypes from 'prop-types';

export const controlPropType = PropTypes.shape({
  register: PropTypes.func,
  unregister: PropTypes.func,
  getFieldState: PropTypes.func,
  _formState: PropTypes.object,
  _updateValid: PropTypes.func,
  _fields: PropTypes.object,
  _formValues: PropTypes.object,
  _subjects: PropTypes.object,
  _proxyFormState: PropTypes.object,
  _options: PropTypes.object
});

export const errorPropType = PropTypes.shape({
  type: PropTypes.string,
  message: PropTypes.string
});

export const formErrorsPropType = PropTypes.objectOf(errorPropType);