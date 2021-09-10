import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import HeaderBase from '../components/HeaderBase';
import Navbar from '../components/Navbar';
import Main from '../components/Main'
import PortfolioContainer from '../components/PortfolioContainer'
import AthleteGrid from '../components/AthleteGrid'
import AthleteContainer from '../components/AthleteContainer'
import filterIcon from '../public/images/filter.png'
import searchIcon from '../public/images/search.png'
import { useDispatch, useSelector } from 'react-redux';
import { getPortfolio, clearData } from '../redux/reducers/contract/portfolio';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import Loading from '../components/Loading';
import * as statusCode from '../data/constants/status'

// const playerList = [ // player list for testing purposes
//     {
//         name: 'STEPHEN CURRY',
//         team: 'Golden State Warriors',
//         id: '320',
//         cost: '420 UST',
//         jersey: '30',
//         positions: ['PG', 'SG'],
//         grad1: 'indigo-blue',
//         grad2: 'indigo-bluegrad',
//     },
//     {
//         name: 'LEBRON JAMES',
//         team: 'Los Angeles Lakers',
//         id: '25',
//         cost: '840 UST',
//         jersey: '23',
//         positions: ['PG', 'SG'],
//         grad1: 'indigo-purple',
//         grad2: 'indigo-purplegrad',
//     },
//     {
//         name: 'DEVIN BOOKER',
//         team: 'Phoenix Suns',
//         id: '16450',
//         cost: '21 UST',
//         jersey: '01',
//         positions: ['SF', 'C'],
//         grad1: 'indigo-darkblue',
//         grad2: 'indigo-darkbluegrad',
//     },
//     {
//         name: 'KEVIN DURANT',
//         team: 'Brooklyn Nets',
//         id: '12300',
//         cost: '180 UST',
//         jersey: '07',
//         positions: ['PG'],
//         grad1: 'indigo-black',
//         grad2: 'indigo-red',
//     },
//     {
//         name: 'BEN SIMMONS',
//         team: 'Philadelphia 76ers',
//         id: '21300',
//         cost: '45.5 UST',
//         jersey: '25',
//         positions: ['SG', 'C'],
//         grad1: 'indigo-blue',
//         grad2: 'indigo-bluegrad',
//     },
//     {
//         name: 'KOBE BRYANT',
//         team: 'Los Angeles Lakers',
//         id: '999',
//         cost: '999 UST',
//         jersey: '24',
//         positions: ['SG'],
//         grad1: 'indigo-purple',
//         grad2: 'indigo-purplegrad',
//     },
//     // {
//     //     name: '',
//     //     team: '',
//     //     id: '',
//     //     cost: '',
//     //     jersey: '',
//     //     positions: [],
//     //     grad1: '',
//     //     grad2: '',
//     // },
// ]

const Portfolio = () => {

    const { register, handleSubmit } = useForm()
    const [result, setResult] = useState("")
    const [teamFilter, setTeamFilter] = useState("")
    const [posFilter, setPosFilter] = useState("")
    const [isClosed, setClosed] = useState(true)
    const [filterMode, setMode] = useState(false)
    const [showFilter, setFilter] = useState(false)
    const [loading, setLoading] = useState(true);
    
    const { tokenList: playerList, status } = useSelector((state) => state.contract.portfolio);

    const dispatch = useDispatch();
    const connectedWallet = useConnectedWallet();


    useEffect(() => {
        if (typeof connectedWallet !== 'undefined') {
            dispatch(getPortfolio({walletAddr: connectedWallet.walletAddress}))
        }
        return function cleanup() {
            dispatch(clearData());
        };
    }, [dispatch, connectedWallet])

    useEffect(() => {
        if (typeof connectedWallet === 'undefined' ) {
            setLoading(false)
        }
        else if(status === statusCode.PENDING){
            setLoading(true)
        }
        else {
            setLoading(false)
        }
    }, [connectedWallet, status])

    const onSubmit = (data) => {
        if (data.search)
            setResult(data.search)
        else setResult("")

        if (data.teamName)
            setTeamFilter(data.teamName)
        else setTeamFilter("")

        if (data.positions)
            setPosFilter(data.positions)
        else setPosFilter("")
    }

    const key1 = 'team'
    const uniqueTeams = [...new Map(playerList.map(i => [i[key1], i])).values()]

    return (
        <>
            <div className={`font-montserrat h-screen relative ${isClosed ? "" : "overflow-y-hidden"}`}>
                {isClosed ? null : <div className="flex flex-row w-full absolute z-50 top-0 left-0 ">
                    <Navbar/>
                    <div className="w-2/6 h-screen" onMouseDown={() => setClosed(true)}></div>
                </div>}

                <HeaderBase isClosed={isClosed} setClosed={setClosed}/>

                <Main color="indigo-dark">
                    
                    {loading ? (
                        <Loading/>
                    ) : (
                    <div className="flex w-full overflow-y-auto overflow-x-hidden h-screen">
                        <PortfolioContainer title="PORTFOLIO" className="flex">
                            <div className="flex flex-col justify-center self-center">
                                <div className="flex w-full mb-4 mt-4">
                                    {filterMode ?
                                        <>
                                            <div className="rounded-md bg-indigo-light mr-1 w-12 h-11" onClick={() => {
                                                setMode(false)
                                                setResult("")
                                            }}>
                                                <div className="ml-3.5 mt-4">
                                                    <img src={filterIcon} />
                                                </div>
                                            </div>

                                            <div className="rounded-md bg-indigo-light ml-1 h-11 w-10/12 flex md:w-80">
                                                <div className="ml-1 mt-2">
                                                    <form onSubmit={handleSubmit(onSubmit)}>
                                                        <input {...register("search")} className="text-xl ml-3 appearance-none bg-indigo-light focus:outline-none w-10/12" placeholder="Search..." />
                                                        <button className="w-1/12 md:w-9">
                                                            <input type="image" src={searchIcon} className="object-none md:ml-3 md:mt-1" />
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div className="flex">
                                                <div className="rounded-md bg-indigo-light mr-1 h-11 w-10/12 flex font-thin md:w-80" onClick={() => setFilter(true)}>
                                                    <div className="text-lg ml-4 mt-2 mr-36 w-9/12">
                                                        Filter by
                                                    </div>
                                                    <img src={filterIcon} className="object-none w-3/12 mr-4" />
                                                </div>

                                                <div className="rounded-md bg-indigo-light ml-1 w-12 h-11" onClick={() => {
                                                    setMode(true)
                                                    setFilter(false)
                                                    setResult("")
                                                }}>
                                                    <div className="ml-4 mt-3">
                                                        <img src={searchIcon} />
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    }
                                </div>

                                <div className="justify-center flex mb-2 md:text-lg">
                                    {showFilter ?
                                        <>
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div>
                                                    Team Name: 
                                                    <select {...register("teamName")} className="bg-indigo-light ml-1">
                                                        <option value="">Select...</option>
                                                        {uniqueTeams.map(function (team, i) {
                                                            return (
                                                                <option value={team.team} key={i}>{team.team}</option>
                                                            )
                                                        }
                                                        )}
                                                    </select>
                                                </div>

                                                <div>
                                                    Position: 
                                                    <select {...register("positions")} className="bg-indigo-light ml-1">
                                                        <option value="">Select...</option>
                                                        <option value="PG">PG</option>
                                                        <option value="SG">SG</option>
                                                        <option value="PF">PF</option>
                                                        <option value="SF">SF</option>
                                                        <option value="C">C</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <input type="submit" className="rounded-md p-1 bg-indigo-light pl-2 pr-2"/>
                                                </div>
                                                {/* {console.log(result)} */}
                                            </form>
                                        </>
                                        :
                                        <>
                                        </>
                                    }
                                </div>
                            </div>

                            <div className="justify-center flex md:w-96 md:self-center">
                                <AthleteGrid>
                                    {filterMode ?
                                        playerList.map(function (player, i) {
                                            const toFindName = player.name.toLowerCase()
                                            const toFindTeam = player.team.toLowerCase()
                                            const searchInfo = result.toLowerCase()
                                            if (toFindName.includes(searchInfo) || toFindTeam.includes(searchInfo) || player.jersey.includes(searchInfo))
                                                return (
                                                    <div className='mb-4' key={i}>
                                                        <AthleteContainer
                                                            AthleteName={player.name}
                                                            TeamName={player.team}
                                                            ID={player.id}
                                                            CoinValue={player.cost}
                                                            Jersey={player.jersey}
                                                            Positions={player.positions}
                                                            colorgrad1={player.grad1}
                                                            colorgrad2={player.grad2}
                                                        />
                                                    </div>
                                            )
                                        })
                                        :
                                        playerList.map(function (player, i) {
                                            const toFindTeam = player.team.toLowerCase()
                                                // console.log(posFilter)
                                                // console.log(teamFilter)
                                            if (posFilter === "" && teamFilter === "") {
                                                // console.log("no filter")
                                                return (
                                                    <div className='mb-4' key={i}>
                                                        <AthleteContainer
                                                            AthleteName={player.name}
                                                            TeamName={player.team}
                                                            ID={player.id}
                                                            CoinValue={player.cost}
                                                            Jersey={player.jersey}
                                                            Positions={player.positions}
                                                            colorgrad1={player.grad1}
                                                            colorgrad2={player.grad2}
                                                        />
                                                    </div>
                                                )
                                            }
                                            else if (posFilter !== "" && teamFilter !== "") {
                                                // console.log("pos and team code")
                                                if (player.positions.includes(posFilter) && toFindTeam.includes(teamFilter.toLowerCase()))
                                                    return (
                                                        <div className='mb-4' key={i}>
                                                            <AthleteContainer
                                                                AthleteName={player.name}
                                                                TeamName={player.team}
                                                                ID={player.id}
                                                                CoinValue={player.cost}
                                                                Jersey={player.jersey}
                                                                Positions={player.positions}
                                                                colorgrad1={player.grad1}
                                                                colorgrad2={player.grad2}
                                                            />
                                                        </div>
                                                    )
                                            }
                                            else if (teamFilter !== "") {
                                                // console.log("team code")
                                                if (toFindTeam.includes(teamFilter.toLowerCase())) {
                                                    return (
                                                        <div className='mb-4' key={i}>
                                                            <AthleteContainer
                                                                AthleteName={player.name}
                                                                TeamName={player.team}
                                                                ID={player.id}
                                                                CoinValue={player.cost}
                                                                Jersey={player.jersey}
                                                                Positions={player.positions}
                                                                colorgrad1={player.grad1}
                                                                colorgrad2={player.grad2}
                                                            />
                                                        </div>
                                                    )
                                                }
                                            }
                                            else if (posFilter !== "") {
                                                // console.log("posFilter code")
                                                if (player.positions.includes(posFilter)) {
                                                    return (
                                                        <div className='mb-4' key={i}>
                                                            <AthleteContainer
                                                                AthleteName={player.name}
                                                                TeamName={player.team}
                                                                ID={player.id}
                                                                CoinValue={player.cost}
                                                                Jersey={player.jersey}
                                                                Positions={player.positions}
                                                                colorgrad1={player.grad1}
                                                                colorgrad2={player.grad2}
                                                            />
                                                        </div>
                                                    )
                                                }
                                            }
                                        })
                                    }
                                </AthleteGrid>
                            </div>
                        </PortfolioContainer>
                    </div>
                    )}
                </Main>
            </div>
        </>
    )
}
export default Portfolio;