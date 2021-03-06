import PropTypes from 'prop-types';
import React from 'react'

const MyactivityContainer = (props) => {
  const { children, color, date, rank, points } = props;

  return (
    <div data-test="MyactivityContainer" className={`bg-${color} mt-4 flex flex-col justify-center  w-full `}>


      <div className="  flex flex-row justify-between mb-4 self-center  w-4/5">
        <div className="font-thin">{date}</div>
        <div className="flex flex-col">
          <p className="font-thin">RANK</p>
          {rank}
        </div>
        <div className="flex flex-col">
          <p className="font-thin">POINTS</p>
          {points}
        </div>


      </div>
      <hr className="w-5/6 self-center" />

    </div>
  );
};

MyactivityContainer.propTypes = {
  color: PropTypes.string,
  date: PropTypes.string,
  rank: PropTypes.string,
  points: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

MyactivityContainer.defaultProps = {

  color: 'indigo-light',
  date: '07/12/21',
  rank: '07',
  points: '78.4',

  // children: <div>Fantasy investr</div>
  children: <div />,
};

export default MyactivityContainer;
