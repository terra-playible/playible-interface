import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
// import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import Main from '../../components/Main';
import PortfolioContainer from '../../components/containers/PortfolioContainer';
import { useDispatch } from 'react-redux';
import { getPortfolio } from '../../redux/reducers/contract/portfolio';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import Link from 'next/link';
import PlayComponent from '../../components/PlayComponent';
import HorizontalScrollContainer from '../../components/containers/HorizontalScrollContainer';
import Container from '../../components/containers/Container';

const activeList = [
    {
        title: 'BEST OF THE EAST',
        date: '2 days ago',
        id: '1',
        icon: 'beastoftheeast',
        prizePool: '7,484.00',
        currPlayers: '100',
        maxPlayers: '100',
        timeLeft: '06:23:05',
        isActive: true
    },
    {
        title: 'CERTIFIED BALLER',
        date: '6 days ago',
        id: '2',
        icon: 'baller',
        prizePool: '2,398.90',
        currPlayers: '77',
        maxPlayers: '100',
        timeLeft: '05:38:09',
        isActive: true
    },
]

const historyList = [
    {
        title: 'TRIPLE DOUBLE',
        date: '2 weeks ago',
        id: '3',
        icon: 'tripledouble',
        prizePool: '9,300.00',
        currPlayers: '100',
        maxPlayers: '100',
        timeLeft: '00:13:54',
        isActive: false
    },
    {
        title: 'EAST VS. WEST',
        date: '3 weeks ago',
        id: '4',
        icon: 'tripledouble',
        prizePool: '1,300.00',
        currPlayers: '100',
        maxPlayers: '100',
        timeLeft: '00:13:54',
        isActive: false
    },
    {
        title: 'BEST ROOKIE YEAR',
        date: '1 month ago',
        id: '5',
        icon: 'baller',
        prizePool: '112,300.00',
        currPlayers: '100',
        maxPlayers: '100',
        timeLeft: '00:03:54',
        isActive: false
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
                <div className="flex flex-col w-full overflow-y-auto h-screen justify-center self-center md:pb-12">
                    <Main color="indigo-white">
                        <div className="flex flex-col md:ml-6">
                            <PortfolioContainer title="PLAY" textcolor="text-indigo-black">
                                <div className="flex flex-col ml-7 mt-6">
                                    <div className="text-lg font-monument">
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
                                    <div className="text-lg font-monument">
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
                            <PortfolioContainer className="flex" title="MY ACTIVITY" textcolor="text-indigo-black">
                                <div className="flex flex-col md:ml-8">
                                    <div className="flex mb-12 md:mb-8 mt-6">
                                        {isActivePlay ?
                                            <> {/* ACTIVE PLAYS IS ACTIVE */}
                                                <div className="w-11/12">
                                                    <div className="flex justify-center md:justify-start font-monument">
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
                                                        {activeList.map(function(data,i){
                                                            if(i < activeList.length-1){
                                                                return(
                                                                    <Link href={`/History?id=${data.id}`}>
                                                                        <div className="flex mt-2 flex-col" key={i}>
                                                                            <div className="flex justify-between text-sm">
                                                                                <div className="font-bold">
                                                                                    {data.title}
                                                                                </div>
                                                                                <div>&#62;</div>
                                                                            </div>

                                                                            <div className="font-thin text-sm mt-1">
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
                                                                                <div className="font-bold">
                                                                                    {data.title}
                                                                                </div>
                                                                                <div>&#62;</div>
                                                                            </div>

                                                                            <div className="font-thin text-sm mt-1">
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
                                                <div className="w-11/12">
                                                    <div className="flex justify-center md:justify-start font-monument">
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
                                                        {historyList.map(function(data, i){
                                                            if(i < historyList.length-1){
                                                                return(
                                                                    <Link href={`/History?id=${data.id}`}>
                                                                        <div className="flex mt-2 flex-col" key={i}>
                                                                            <div className="flex justify-between text-sm">
                                                                                <div className="font-bold">
                                                                                    {data.title}
                                                                                </div>
                                                                                <div>&#62;</div>
                                                                            </div>

                                                                            <div className="font-thin text-sm mt-1">
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
                                                                        <div className="flex mt-4 flex-col" key={i}>
                                                                            <div className="flex justify-between text-sm">
                                                                                <div className="font-bold">
                                                                                    {data.title}
                                                                                </div>
                                                                                <div>&#62;</div>
                                                                            </div>

                                                                            <div className="font-thin text-sm mt-1">
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