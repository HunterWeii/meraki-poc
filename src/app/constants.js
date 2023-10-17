import PropTypes from 'prop-types';

export const key = 'homeLanding';

const ComponentPropType = {
  key: PropTypes.string,
  properties: PropTypes.object,
  styles: PropTypes.object, // React.CSSProperties
  gaParams: PropTypes.object,
  listAPI: PropTypes.shape({
    path: PropTypes.string,
    queryParams: PropTypes.object,
  }),
};

export const ComponentsPropTypes = {
  ...ComponentPropType,
  subComponents: PropTypes.arrayOf(ComponentPropType.shape),
};
