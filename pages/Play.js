import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
// import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import HeaderBase from '../components/HeaderBase';
import Navbar from '../components/Navbar';
import Main from '../components/Main';
import TitledContainer from '../components/TitledContainer';
import PortfolioContainer from '../components/PortfolioContainer';
import { useDispatch } from 'react-redux';
import { getPortfolio } from '../redux/reducers/contract/portfolio';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import Link from 'next/link';
import DesktopNavbar from '../components/DesktopNavbar';
import PlayComponent from '../components/PlayComponent';
import HorizontalScrollContainer from '../components/HorizontalScrollContainer';
import Container from '../components/Container'

const playerList = [ // player list for testing purposes
    {
        name: 'STEPHEN CURRY',
        team: 'Golden State Warriors',
        id: '320',
        cost: '420 UST',
        jersey: '30',
        positions: ['PG', 'SG'],
        avgscore: '86.3',
        grad1: 'indigo-blue',
        grad2: 'indigo-bluegrad',
    },
    {
        name: 'TAUREAN PRINCE',
        team: 'Minnesota Timberwolves',
        id: '14450',
        cost: '41 UST',
        jersey: '12',
        positions: ['PG'],
        avgscore: '66.5',
        grad1: 'indigo-purple',
        grad2: 'indigo-purplegrad',
    },
]

const playerList2 = [ // player list for testing purposes
    {
        name: 'LEBRON JAMES',
        team: 'Los Angeles Lakers',
        id: '25',
        cost: '840 UST',
        jersey: '23',
        positions: ['PG', 'SG'],
        avgscore: '96.0',
        grad1: 'indigo-purple',
        grad2: 'indigo-purplegrad',
    },
    {
        name: 'DEVIN BOOKER',
        team: 'Phoenix Suns',
        id: '16450',
        cost: '21 UST',
        jersey: '01',
        positions: ['SF', 'C'],
        avgscore: '76.8',
        grad1: 'indigo-darkblue',
        grad2: 'indigo-darkbluegrad',
    },
]

const playerList3 = [ // player list for testing purposes
    {
        name: 'ARMONI BROOKS',
        team: 'Houston Rockets',
        id: '21300',
        cost: '45.5 UST',
        jersey: '23',
        positions: ['SG', 'C'],
        avgscore: '81.0',
        grad1: 'indigo-blue',
        grad2: 'indigo-bluegrad',
    },
    {
        name: 'KEVIN DURANT',
        team: 'Brooklyn Nets',
        id: '12300',
        cost: '180 UST',
        jersey: '07',
        positions: ['PG'],
        avgscore: '83.0',
        grad1: 'indigo-black',
        grad2: 'indigo-red',
    },
]

const activePlaySample = [
    {
        id: '1',
        type: 'Daily',
        week: '',
        entry: '3',
        tokenList: playerList,
        date: 'July 3, 2021'
    },
    {
        id: '2',
        type: 'Daily',
        week: '',
        entry: '',
        tokenList: playerList2,
        date: 'August 1, 2021'
    },
    {
        id: '3',
        type: 'Seasonal',
        week: '3',
        entry: '',
        tokenList: playerList3,
        date: 'July 12, 2021'
    },
]

const playHistorySample = [
    {
        id: '4',
        type: 'Seasonal',
        week: '1',
        entry: '',
        rank: '2',
        score: '96.5',
        prize: '15',
    },
    {
        id: '5',
        type: 'Daily',
        week: '',
        entry: '5',
        rank: '1',
        score: '98.7',
        prize: '30',
    },
    {
        id: '6',
        type: 'Weekly',
        week: '',
        entry: '3',
        rank: '10',
        score: '70.3',
        prize: '1',
    },
]

const levelOnePlayList = [
    {
        icon: 'beastoftheeast',
        prizePool: '7,484.00',
        currPlayers: '100',
        maxPlayers: '100',
        timeLeft: '06:23:05'
    },
    {
        icon: 'threepointshootout',
        prizePool: '8,624.00',
        currPlayers: '24',
        maxPlayers: '100',
        timeLeft: '05:25:22'
    },
]

const levelTwoPlayList = [
    {
        icon: 'baller',
        prizePool: '2,398.90',
        currPlayers: '77',
        maxPlayers: '100',
        timeLeft: '05:38:09'
    },
    {
        icon: 'playoffschallenge',
        prizePool: '1,002.00',
        currPlayers: '100',
        maxPlayers: '100',
        timeLeft: '02:28:31'
    },
    {
        icon: 'tripledouble',
        prizePool: '9,300.00',
        currPlayers: '100',
        maxPlayers: '100',
        timeLeft: '00:13:54'
    },
    {
        icon: 'playoffschallenge',
        prizePool: '1,002.00',
        currPlayers: '100',
        maxPlayers: '100',
        timeLeft: '02:28:31'
    },
]

const Play = () => {
    const { status, connect, disconnect, availableConnectTypes } = useWallet();
    const [isActivePlay, setPlay] = useState(true)

    const interactWallet = () => {
        if (status === WalletStatus.WALLET_CONNECTED) {
            disconnect();
        } else {
            connect(availableConnectTypes[1]);
        }
    };
    const dispatch = useDispatch();
    const connectedWallet = useConnectedWallet();


    useEffect(() => {
        if(typeof connectedWallet !== 'undefined')
        dispatch(getPortfolio({walletAddr: connectedWallet.walletAddress}))
    }, [connectedWallet])
    
    return (
        <Container>
            {/* <div className={`font-montserrat h-screen relative flex overflow-x-hidden`}> */}
                <div className="flex flex-col w-full overflow-y-auto h-screen justify-center self-center md:pb-12">
                    <Main color="indigo-dark">
                        <div className="flex flex-col">
                            <PortfolioContainer title="PLAY">
                                <div className="flex flex-col ml-7 mt-6">
                                    <div className="text-lg">
                                        LEVEL 1
                                    </div>
                                
                                    <div className="mt-4 flex">
                                        <HorizontalScrollContainer>
                                            {levelOnePlayList.map(function(data,i){
                                                return (
                                                    <div className="mr-6">
                                                        <PlayComponent
                                                            icon={data.icon}
                                                            prizePool={data.prizePool}
                                                            currPlayers={data.currPlayers}
                                                            maxPlayers={data.maxPlayers}
                                                            timeLeft={data.timeLeft}
                                                        />
                                                    </div>
                                                )
                                            })}
                                        </HorizontalScrollContainer>
                                    </div>
                                </div>

                                <div className="flex flex-col ml-7 mt-12">
                                    <div className="text-lg">
                                        LEVEL 2
                                    </div>
                                
                                    <div className="mt-4 flex">
                                        <HorizontalScrollContainer>
                                            {levelTwoPlayList.map(function(data,i){
                                                return (
                                                    <div className="mr-6">
                                                        <PlayComponent
                                                            icon={data.icon}
                                                            prizePool={data.prizePool}
                                                            currPlayers={data.currPlayers}
                                                            maxPlayers={data.maxPlayers}
                                                            timeLeft={data.timeLeft}
                                                        />
                                                    </div>
                                                )
                                            })}
                                        </HorizontalScrollContainer>
                                    </div>
                                </div>
                            </PortfolioContainer>

                            <div className="mt-12">
                            <PortfolioContainer className="flex" title="MY ACTIVITY">
                                <div className="flex flex-col ml-8">
                                    <div className="flex mb-4 mt-6">
                                        {isActivePlay ?
                                            <> {/* ACTIVE PLAYS IS ACTIVE */}
                                                <div className="w-5/6">
                                                    <div className="flex">
                                                        <div className="border-b-8 mr-4 border-indigo-buttonblue">
                                                            ACTIVE PLAYS
                                                        </div>

                                                        <div className="ml-4" onClick={() => {
                                                            setPlay(false)
                                                        }}>
                                                            PLAY HISTORY
                                                        </div>
                                                    </div>

                                                    <div className="mt-12 ml-12">
                                                        {activePlaySample.map(function(data,i){
                                                            if(i < activePlaySample.length-1){
                                                                return(
                                                                    <Link href={`/History?id=${data.id}`}>
                                                                        <div className="flex mt-2 flex-col" key={i}>
                                                                            <div className="flex justify-between text-sm">
                                                                                <div className="flex">
                                                                                    <div className="mr-2">
                                                                                        {data.type} Play {data.entry}
                                                                                    </div>
                                                                                    {data.week ?
                                                                                        <div>
                                                                                            (WEEK {data.week})
                                                                                        </div>
                                                                                    :
                                                                                        <></>
                                                                                    }
                                                                                </div>
                                                                                <div>&#62;</div>
                                                                            </div>

                                                                            <div className="font-thin text-sm overflow-ellipsis mt-1">
                                                                                <div>
                                                                                    #{data.tokenList[0].id}/25000 {data.tokenList[0].name}, #{data.tokenList[1].id}/25000 {data.tokenList[1].name}...
                                                                                </div>
                                                                            </div>

                                                                            <div className="font-thin text-sm mt-3">
                                                                                {data.date}
                                                                            </div>

                                                                            <hr className="w-full self-center opacity-25 my-8"/>
                                                                        </div>
                                                                    </Link>
                                                                )
                                                            }
                                                            else {
                                                                return(
                                                                    <Link href={`/History?id=${data.id}`}>
                                                                        <div className="flex mt-2 flex-col" key={i}>
                                                                            <div className="flex justify-between text-sm">
                                                                                <div className="flex">
                                                                                    <div className="mr-2">
                                                                                    {data.type} Play {data.entry} 
                                                                                    </div>
                                                                                    <div>
                                                                                    {data.week ?
                                                                                        <div>
                                                                                            (WEEK {data.week})
                                                                                        </div>
                                                                                    :
                                                                                        <></>
                                                                                    }
                                                                                    </div>
                                                                                </div>
                                                                                
                                                                                <div>&#62;</div>
                                                                            </div>

                                                                            <div className="font-thin text-sm overflow-ellipsis mt-1">
                                                                                <div>
                                                                                    #{data.tokenList[0].id}/25000 {data.tokenList[0].name}, #{data.tokenList[1].id}/25000 {data.tokenList[1].name}...
                                                                                </div>
                                                                            </div>

                                                                            <div className="font-thin text-sm mt-3 mb-8">
                                                                                {data.date}
                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                )
                                                            }
                                                        })}
                                                    </div>
                                                </div>
                                            </>
                                            : 
                                            <> {/* PLAY HISTORY IS ACTIVE */}
                                                <div className="w-5/6">
                                                    <div className="flex">
                                                        <div className="mr-4" onClick={() => {
                                                            setPlay(true)
                                                        }}>
                                                            ACTIVE PLAYS
                                                        </div>

                                                        <div className="ml-4 border-b-8 border-indigo-buttonblue">
                                                            PLAY HISTORY
                                                        </div>
                                                    </div>

                                                    <div className="mt-12 ml-12">
                                                        {playHistorySample.map(function(data, i){
                                                            if(i < playHistorySample.length-1){
                                                                return(
                                                                    <Link href={`/History?id=${data.id}`}>
                                                                        <div className="flex mt-2 flex-col" key={i}>
                                                                            <div className="flex justify-between text-sm">
                                                                                <div className="flex">
                                                                                    <div className="mr-2">
                                                                                        {data.type} Play {data.entry}
                                                                                    </div>
                                                                                    {data.week ?
                                                                                        <div>
                                                                                            (WEEK {data.week})
                                                                                        </div>
                                                                                    :
                                                                                        <></>
                                                                                    }
                                                                                </div>
                                                                                
                                                                                <div>&#62;</div>
                                                                            </div>

                                                                            <div className="flex font-thin mt-4 text-sm">
                                                                                <div className="flex flex-col mr-10">
                                                                                    <div>
                                                                                        Rank
                                                                                    </div>
                                                                                    <div>
                                                                                        {data.rank}
                                                                                    </div>
                                                                                </div>

                                                                                <div className="flex flex-col mr-10">
                                                                                    <div>
                                                                                        Score
                                                                                    </div>
                                                                                    <div>
                                                                                        {data.score}
                                                                                    </div>
                                                                                </div>

                                                                                <div className="flex flex-col">
                                                                                    <div>
                                                                                        Prize
                                                                                    </div>
                                                                                    <div>
                                                                                        {data.prize} UST
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <hr className="w-full self-center opacity-25 my-8"/>
                                                                        </div>
                                                                    </Link>
                                                                )
                                                            }
                                                            else {
                                                                return(
                                                                    <Link href={`/History?id=${data.id}`}>
                                                                        <div className="flex mt-4 flex-col" key={i}>
                                                                            <div className="flex justify-between text-sm">
                                                                                <div className="flex">
                                                                                    <div className="mr-2">
                                                                                        {data.type} Play {data.entry}
                                                                                    </div>
                                                                                    <div>
                                                                                        {data.week ?
                                                                                            <div>
                                                                                                (WEEK {data.week})
                                                                                            </div>
                                                                                        :
                                                                                            <></>
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                                
                                                                                <div>&#62;</div>
                                                                            </div>

                                                                            <div className="flex font-thin mt-4 text-sm">
                                                                                <div className="flex flex-col mr-10">
                                                                                    <div>
                                                                                        Rank
                                                                                    </div>
                                                                                    <div>
                                                                                        {data.rank}
                                                                                    </div>
                                                                                </div>

                                                                                <div className="flex flex-col mr-10">
                                                                                    <div>
                                                                                        Score
                                                                                    </div>
                                                                                    <div>
                                                                                        {data.score}
                                                                                    </div>
                                                                                </div>

                                                                                <div className="flex flex-col mb-8">
                                                                                    <div>
                                                                                        Prize
                                                                                    </div>
                                                                                    <div>
                                                                                        {data.prize} UST
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                )
                                                            }
                                                        })}
                                                    </div>
                                                </div>
                                            </>
                                        }
                                    </div>
                                </div>
                            </PortfolioContainer>
                            </div>

                        </div>

                    </Main>

                </div>

            {/* </div> */}
        </Container>
    );
}
export default Play;