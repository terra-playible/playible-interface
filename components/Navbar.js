import PropTypes from 'prop-types';

const Navbar = (props) => {
  const { children, color } = props;

  return (
    <div data-test="Navbar" className={`bg-${color} flex flex-col w-1/6 h-full`}>
      {children}
    </div>
  );
};

Navbar.propTypes = {
  color: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

Navbar.defaultProps = {
  color: 'blue',
  // children: <div>Fantasy investr</div>
  children: <div />,
};

export default Navbar;