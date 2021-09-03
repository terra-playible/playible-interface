import PropTypes from 'prop-types';

const GameResultContainer = (props) => {
  const { children, color, date, rank, points } = props;

  return (
    <div data-test="GameResultContainer" className={`bg-${color} flex flex-col justify-center mt-1 w-full`}>


      <div className="  flex flex-row justify-between mb-8 self-center  w-10/12">
        <img src="images/trophy.png" alt="Img" className="flex transform scale-x-75 scale-y-50 " />
        <div className="text-xs font-thin">{date}</div>
        <div className="flex flex-col">
          <p className="font-thin text-xs">RANK</p>
          {rank}
        </div>
        <div className="flex flex-col">
          <p className="font-thin text-xs">POINTS</p>
          {points}
        </div>


      </div>
      <hr className="w-10/12 self-center" />

    </div>
  );
};

GameResultContainer.propTypes = {
  color: PropTypes.string,
  date: PropTypes.string,
  rank: PropTypes.string,
  points: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

GameResultContainer.defaultProps = {

  color: 'indigo-light',
  date: '07/12/21',
  rank: '07',
  points: '78.4',

  // children: <div>Fantasy investr</div>
  children: <div />,
};

export default GameResultContainer;
