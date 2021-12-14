import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import PortfolioContainer from '../../components/containers/PortfolioContainer';
import Main from '../../components/Main';
import PlayerContainer from '../../components/containers/PlayerContainer';
import PlayerStats from '../../components/PlayerStats';
import Container from '../../components/containers/Container';

import filterIcon from '../../public/images/filter.png';
import underlineIcon from '../../public/images/blackunderline.png';

import { useRouter } from 'next/router';
import Link from 'next/link';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import { useDispatch, useSelector } from 'react-redux';

import PostSaleModal from './forms/PostSaleModal';
import CongratsModal from './components/congratsModal';
import LoadingPageDark from '../../components/loading/LoadingPageDark';

const playerdata = [
  {
    key: 'sevendays',
    points: {
      score: 35,
      pos: "3rd",
    },
    rebounds: {
      score: 5.5,
      pos: "24th",
    },
    assists: {
      score: 23,
      pos: "55th",
    },
    blocks: {
      score: 5,
      pos: "5th",
    },
    steals: {
      score: 11,
      pos: "6th",
    },
  },
  {
    key: 'month',
    points: {
      score: 50,
      pos: "2nd",
    },
    rebounds: {
      score: 9,
      pos: "45th",
    },
    assists: {
      score: 44,
      pos: "24th",
    },
    blocks: {
      score: 13,
      pos: "9th",
    },
    steals: {
      score: 18,
      pos: "7th",
    },
  },
  {
    key: 'year',
    points: {
      score: 86,
      pos: "1st",
    },
    rebounds: {
      score: 19,
      pos: "37th",
    },
    assists: {
      score: 68,
      pos: "16th",
    },
    blocks: {
      score: 32,
      pos: "5th",
    },
    steals: {
      score: 23,
      pos: "3rd",
    },
  },
]

const playerList = [ // player list for testing purposes
  {
    name: 'STEPHEN CURRY',
    team: 'Golden State Warriors',
    id: '1',
    owner: 'terra1f8wkdt7sms3c3tucaqle7yvn59v8qz27srlghj',
    silvercost: '420 UST',
    goldcost: '521 UST',
    jersey: '30',
    positions: ['PG', 'SG'],
    avgscore: '86.3',
    stats: 86.5,
    data: playerdata,
    grad1: 'indigo-blue',
    grad2: 'indigo-bluegrad',
    rarity: 'silver',
    lowestask: '120 UST',
    highestask: '550 UST'
  },
  {
    name: 'TAUREAN PRINCE',
    team: 'Minnesota Timberwolves',
    id: '2',
    owner: 'terraasdsadsadsadd',
    silvercost: '41 UST',
    goldcost: '55 UST',
    jersey: '12',
    positions: ['PG'],
    avgscore: '66.5',
    stats: 66.9,
    data: playerdata,
    grad1: 'indigo-purple',
    grad2: 'indigo-purplegrad',
    rarity: 'silver',
    lowestask: '120 UST',
    highestask: '550 UST'
  },
  {
    name: 'LEBRON JAMES',
    team: 'Los Angeles Lakers',
    id: '3',
    owner: 'terraasdsadsadsadd',
    silvercost: '840 UST',
    goldcost: '1100 UST',
    jersey: '23',
    positions: ['PG', 'SG'],
    avgscore: '96.0',
    stats: 90.2,
    data: playerdata,
    grad1: 'indigo-purple',
    grad2: 'indigo-purplegrad',
    rarity: 'gold',
    lowestask: '120 UST',
    highestask: '550 UST'
  },
  {
    name: 'DEVIN BOOKER',
    team: 'Phoenix Suns',
    id: '4',
    owner: 'terraasdsadsadsadd',
    silvercost: '21 UST',
    goldcost: '34 UST',
    jersey: '01',
    positions: ['SF', 'C'],
    avgscore: '76.8',
    stats: 80.5,
    data: playerdata,
    grad1: 'indigo-darkblue',
    grad2: 'indigo-darkbluegrad',
    rarity: 'silver',
    lowestask: '120 UST',
    highestask: '550 UST'
  },
  {
    name: 'ARMONI BROOKS',
    team: 'Houston Rockets',
    id: '21300',
    owner: 'terraasdsadsadsadd',
    silvercost: '45.5 UST',
    goldcost: '66.6 UST',
    jersey: '23',
    positions: ['SG', 'C'],
    avgscore: '81.0',
    stats: 76.2,
    data: playerdata,
    grad1: 'indigo-blue',
    grad2: 'indigo-bluegrad',
    rarity: 'silver',
    lowestask: '120 UST',
    highestask: '550 UST'
  },
  {
    name: 'KEVIN DURANT',
    team: 'Brooklyn Nets',
    id: '12300',
    owner: 'terraasdsadsadsadd',
    silvercost: '180 UST',
    goldcost: '220 UST',
    jersey: '07',
    positions: ['PG'],
    avgscore: '83.0',
    stats: 77.7,
    data: playerdata,
    grad1: 'indigo-black',
    grad2: 'indigo-red',
    rarity: 'gold',
    lowestask: '120 UST',
    highestask: '550 UST'
  },
  {
    name: 'KOBE BRYANT',
    team: 'Los Angeles Lakers',
    id: '999',
    owner: 'terraasdsadsadsadd',
    silvercost: '999 UST',
    goldcost: '1001 UST',
    jersey: '24',
    positions: ['SG'],
    avgscore: '96.0',
    stats: 99.9,
    data: playerdata,
    grad1: 'indigo-purple',
    grad2: 'indigo-purplegrad',
    rarity: 'silver',
    lowestask: '120 UST',
    highestask: '550 UST'
  },
  // {
  //     name: '',
  //     team: '',
  //     id: '',
  //     cost: '',
  //     jersey: '',
  //     positions: [],
  //     grad1: '',
  //     grad2: '',
  // },
]

/*const tokenList = [
    {
        id: '12300',
        rarity: 'gold'
    },
    {
        id: '320',
        rarity: 'base'
    },
    {
        id: '320',
        rarity: 'base'
    },
    {
        id: '21300',
        rarity: 'silver'
    },
    {
        id: '320',
        rarity: 'base'
    },
    {
        id: '14450',
        rarity: 'silver'
    },
    {
        id: '320',
        rarity: 'silver'
    },
]*/

const AssetDetails = () => {
    //const { register, handleSubmit } = useForm()
    const connectedWallet = useConnectedWallet();

    const [loading, setLoading] = useState(true)
    const [tokenCongrats, setTokenCongrats] = useState(false)
    const [displayModal, setModal] = useState(false)
    const [congratsModal, displayCongrats] = useState(false)
    const [postingModal, setPostingModal] = useState(false)
    const [assetData, setAssetData] = useState(null)

    //const [statfilter, setFilter] = useState("sevendays")
    //const [silverDropdown, displaySilver] = useState(false)
    //const [goldDropdown, displayGold] = useState(false)
    const { query } = useRouter()

    //const { list: playerList } = useSelector((state) => state.external.playible.assets)

    /*const baseTokenCount = tokenList.reduce(function(n, list){
        return n + (list.id === playerToFind.id && list.rarity === 'base')
    }, 0)

    const silverTokenCount = tokenList.reduce(function(n, list){
        return n + (list.id === playerToFind.id && list.rarity === 'silver')
    }, 0)
    
    const filteredList = tokenList.filter((list,i) => {
        return tokenList[i].id === playerToFind.id
    })
    const baseFilteredList = filteredList.filter((list,i)=>{
        return filteredList[i].rarity === 'base'
    })
    const silverFilteredList = filteredList.filter((list,i)=>{
        return filteredList[i].rarity === 'silver'
    })*/

    useEffect(() => {
      const data = playerList.find((item) => String(item.id) === String(query.id))
      if(typeof data !== "undefined"){
        setAssetData(data)
        setLoading(false)
      }
    }, [playerList])

    /*const handleFilter = (event) => {
        setFilter(event.target.value)
    }*/
    //TODO: Congrats Modal after purchase process
    return (
        <div className={`font-montserrat`}>
            { tokenCongrats &&
              <div className="fixed w-screen h-screen bg-opacity-70 z-50 overflow-auto bg-indigo-gray flex">
                <div className="relative p-8 bg-indigo-white w-80 h-10/12 m-auto flex-col flex rounded-lg">
                  <button onClick={()=>{setTokenCongrats(false)}}>
                    <div className="absolute top-0 right-0 p-4 font-black">
                      X
                    </div>
                  </button>

                  <div className="font-bold flex flex-col">
                    CONGRATULATIONS!
                    <img src={underlineIcon} className="sm:object-none md:w-6" />
                  </div>

                  <div className="flex flex-col mt-4 items-center">
                    <div className="">
                      <PlayerContainer playerID={assetData.id} rarity='base'/>
                    </div>
                    <div>
                      <div>
                        <div className="font-thin text-xs mt-4">
                          #{assetData.id}/25000
                        </div>

                        <div className="text-sm font-bold">
                          {assetData.name}
                        </div>

                        <div className="font-thin mt-4 text-xs">
                          AVERAGE SCORE
                        </div>

                        <div className="text-sm font-bold">
                          {assetData.avgscore}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Link href="/Portfolio">
                    <button className="bg-indigo-buttonblue w-full h-12 text-center font-bold rounded-md text-sm mt-6 self-center">
                      <div className="text-indigo-white">
                        GO TO SQUAD
                      </div>
                    </button>
                  </Link>
                </div>
              </div>
            }
            { congratsModal && <CongratsModal onClose={ () => { displayCongrats(false) } }/> }
            { postingModal &&
                <PostSaleModal
                  asset={assetData}
                  onClose={() => {
                    setPostingModal(false)
                  }}
                  onSubmit={() => {
                    setPostingModal(false)
                    displayCongrats(true)
                  }}
                />
            }
            { displayModal &&
                <>
                    <div className="fixed w-screen h-screen bg-opacity-70 z-50 overflow-auto bg-indigo-gray flex">
                        <div className="relative p-8 bg-indigo-white w-11/12 md:w-96 h-10/12 md:h-auto m-auto flex-col flex rounded-lg">
                            <button onClick={()=>{setModal(false)}}>
                                <div className="absolute top-0 right-0 p-4 font-black">
                                    X
                                </div>
                            </button>

                            <div className="flex flex-col md:flex-row">
                                <div className="font-bold flex flex-col text-2xl">
                                    PURCHASE NOW
                                    <img src={underlineIcon} className="sm:object-none w-6" />
                                </div>
                            </div>

                            <div className="flex flex-col mt-4 items-center">
                                <div className="">
                                    <PlayerContainer playerID={assetData.id} rarity='base'/>
                                </div>
                            </div>

                            <div className="flex justify-between mt-4">
                                <div>
                                    <div className="font-bold">
                                    #{assetData.id}/25000
                                    </div>

                                    <div className="font-thin">
                                        SERIAL NUMBER
                                    </div>
                                </div>

                                <div className="text-right">
                                    <div className="font-bold">
                                        {assetData.silvercost}
                                    </div>

                                    <div className="font-thin">
                                        PRICE
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between mt-6">
                                <div>
                                    <div className="font-bold">
                                        @masterworm
                                    </div>

                                    <div className="font-thin">
                                        OWNER
                                    </div>
                                </div>

                                <div className="text-right">
                                    <div className="font-bold">
                                        0x2d95...a02c
                                    </div>

                                    <div className="font-thin">
                                        CONTACT ADDRESS
                                    </div>
                                </div>
                            </div>

                            <button className="bg-indigo-buttonblue w-full h-12 text-center font-bold rounded-md text-sm mt-4 self-center" onClick={()=>{setModal(false);setTokenCongrats(true)}}>
                                <div className="text-indigo-white">
                                    PURCHASE NOW - {assetData.silvercost}
                                </div>
                            </button>
                        </div>
                    </div>
                </>
            }
            <Container>
              {loading ? (
                <LoadingPageDark/>
              ) : (
                <div className="flex flex-col w-screen md:w-full overflow-y-auto h-auto justify-center self-center">
                  <div className="flex">
                    <div className="flex flex-col w-full h-screen">
                      <Main color="indigo-dark">
                        <div className="flex flex-col overflow-y-auto overflow-x-hidden">
                          <div className="md:ml-8">
                            <Link href={query.origin === 'portfolio' ? "/Portfolio/" : "/Marketplace/"}>
                              <div className="text-indigo-white flex mt-6 ml-6 mb-2">
                                <div className="font-bold mr-2">&#x3c;</div><div>Back</div>
                              </div>
                            </Link>
                              
                            <PortfolioContainer title="PLAYER DETAILS">
                              <div className="flex flex-col mt-2 mb-8">
                                <div className="flex md:flex-row flex-col md:mt-8">
                                  <div>
                                    <div className="ml-8 md:ml-6 mr-16">
                                      <PlayerContainer playerID={assetData.id} rarity='base'/>
                                    </div>
                                  </div>
                                  <div className="flex flex-col">
                                    <div className="ml-8 md:ml-0 mb-4 md:mb-0">
                                      { query.origin === 'portfolio' &&
                                        <div className="font-thin text-sm">
                                          #{assetData.id}/25000
                                        </div>
                                      }
                                      
                                      <div className="text-sm">
                                        {assetData.name}
                                      </div>

                                      <div className="font-thin mt-4 text-sm">
                                        AVERAGE SCORE
                                      </div>

                                      <div className="text-sm">
                                        {assetData["avgscore"]}
                                      </div>
                                    </div>

                                    <div className="flex flex-col md:flex-row md:justify-between mb-2 text-sm ml-8 md:ml-0">
                                      {/*<div>
                                        <div className="font-thin">
                                          PRICE
                                        </div>
                                        {assetData["silvercost"]}
                                      </div>*/}
                                      
                                      <div>
                                        <div className="font-thin">
                                          OWNER
                                        </div>
                                        {connectedWallet.walletAddress === assetData["owner"] ? "YOU" : assetData["owner"]}
                                      </div>
                                    </div>

                                    <button className="bg-indigo-buttonblue w-5/6 md:w-60 h-10 text-center font-bold text-md mt-4 self-center justify-center">
                                      { query.origin === 'portfolio' &&
                                        <div className="" onClick={()=>{ setPostingModal(true) }}>
                                          POST FOR SALE
                                        </div>
                                      }

                                      { query.origin === 'marketplace' &&
                                        <div className="" onClick={()=>{ setModal(true) }}>
                                          PURCHASE TOKEN
                                        </div>
                                      }
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </PortfolioContainer>

                            { query.origin === 'portfolio' &&
                              <PortfolioContainer title="OTHER TOKENS">
                                <div className="flex mt-8 ml-8 grid grid-cols-2 md:grid-cols-4">
                                  <div className="flex flex-col">
                                    <div>
                                      <PlayerContainer playerID={assetData.id} rarity='silver'/>
                                    </div>
                                    <div className="text-sm mt-2">
                                      {assetData.name}
                                    </div>
                                    <div className="font-thin text-xs">
                                      SILVER
                                    </div> 
                                    <div className="mt-4 text-sm">
                                      {assetData.silvercost}
                                    </div>
                                  </div>
                                

                                  <div className="flex flex-col">
                                    <div>
                                      <PlayerContainer playerID={assetData.id} rarity='gold'/>
                                    </div>
                                    <div className="text-sm mt-2">
                                      {assetData.name}
                                    </div>
                                    <div className="font-thin text-xs">
                                      GOLD
                                    </div> 
                                    <div className="mt-4 text-sm">
                                      {assetData.goldcost}
                                    </div>
                                  </div>

                                    {/* TEMPLATE FOR NEW RARITY */}
                                    {/* <div className="flex flex-col">
                                        <div>
                                            <PlayerContainer playerID={playerToFind.id} rarity='gold'/>
                                        </div>
                                        <div className="text-sm mt-2">
                                            {playerToFind.name}
                                        </div>
                                        <div className="font-thin text-xs">
                                            GOLD
                                        </div> 
                                        <div className="mt-4 text-sm">
                                            {playerToFind.goldcost}
                                        </div>
                                    </div> */}
                                </div>
                              </PortfolioContainer>
                            }
                              
                            {/*<div className="mt-10 flex flex-col md:flex-row justify-between">
                              <PortfolioContainer title="PLAYER STATS" stats={playerToFind.stats}/>
                              <div className="self-center md:mr-24">
                                <div className="rounded-md bg-indigo-light md:mr-7 h-11 w-80 flex justify-between self-center font-thin md:w-72 mt-4 md:mt-12">
                                  <div className="text-lg ml-4 mt-2 text-indigo-white">
                                    <form onSubmit={handleSubmit(handleFilter)}>
                                      <select value={statfilter} className='filter-select bg-indigo-light' onChange={handleFilter}>
                                        <option name="sevendays" value="sevendays">Last 7 days</option>
                                        <option name="month" value="month">Last month</option>
                                        <option name="year" value="year">Last year</option>
                                      </select>
                                    </form>
                                  </div>
                                  <img src={filterIcon} className="object-none w-4 mr-4" />
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col justify-center self-center text-indigo-white md:mr-24 mb-8">
                              <div className="mt-8 mb-16 self-center">
                                {playerToFind.data.map(function(data, i){
                                  if(statfilter === data.key)
                                    return <PlayerStats player={data} key={i}/>
                                })}
                              </div>
                              </div>*/}
                          </div>
                        </div>
                      </Main>
                    </div>
                  </div>
                </div>
              )}
            </Container>
        </div>
    )
}

export default AssetDetails;