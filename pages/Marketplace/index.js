import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Main from '../../components/Main'
import PortfolioContainer from '../../components/containers/PortfolioContainer'
import MarketplaceContainer from '../../components/containers/MarketplaceContainer';
import { useDispatch, useSelector } from 'react-redux';
import { getSalesOrders, clearData } from '../../redux/reducers/external/playible/salesOrder';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import LoadingPageDark from '../../components/loading/LoadingPageDark';
import Link from 'next/link'
import Container from '../../components/containers/Container';
import Sorter from './components/Sorter';

const salesList = [ // player list for testing purposes
    {
        name: 'STEPHEN CURRY',
        team: 'Golden State Warriors', //2
        id: '320',
        cost: '420 UST',
        jersey: '30',
        positions: ['PG', 'SG'],
        avgscore: '86.3',
        grad1: 'indigo-blue',
        grad2: 'indigo-bluegrad',
        listing: '12/12/2024', //4
        rarity: 'base',
        lowestask: '120 UST',
    },
    {
        name: 'TAUREAN PRINCE',
        team: 'Minnesota Timberwolves', //6
        id: '14450',
        cost: '41 UST',
        jersey: '12',
        positions: ['PG'],
        avgscore: '66.5',
        grad1: 'indigo-purple',
        grad2: 'indigo-purplegrad',
        listing: '12/12/2021', //3
        rarity: 'silver',
        lowestask: '45 UST',
    },
    {
        name: 'LEBRON JAMES',
        team: 'Los Angeles Lakers', //5
        id: '25',
        cost: '840 UST',
        jersey: '23',
        positions: ['PG', 'SG'],
        avgscore: '96.0',
        grad1: 'indigo-purple',
        grad2: 'indigo-purplegrad',
        listing: '11/12/2025', //6
        rarity: 'gold',
        lowestask: '3 UST',
    },
    {
        name: 'DEVIN BOOKER',
        team: 'Phoenix Suns', //7
        id: '16450',
        cost: '21 UST',
        jersey: '01',
        positions: ['SF', 'C'],
        avgscore: '76.8',
        grad1: 'indigo-darkblue',
        grad2: 'indigo-darkbluegrad',
        listing: '12/11/2025', //5
        rarity: 'silver',
        lowestask: '354 UST',
    },
    {
        name: 'ARMONI BROOKS',
        team: 'Houston Rockets', //3
        id: '21300',
        cost: '45.5 UST',
        jersey: '23',
        positions: ['SG', 'C'],
        avgscore: '81.0',
        grad1: 'indigo-blue',
        grad2: 'indigo-bluegrad',
        listing: '12/12/2001', //1
        rarity: 'silver',
        lowestask: '321 UST',
    },
    {
        name: 'KEVIN DURANT',
        team: 'Brooklyn Nets', //1
        id: '12300',
        cost: '180 UST',
        jersey: '07',
        positions: ['PG'],
        avgscore: '83.0',
        grad1: 'indigo-black',
        grad2: 'indigo-red',
        listing: '10/12/2004', //2
        rarity: 'gold',
        lowestask: '221 UST',
    },
    {
        name: 'KOBE BRYANT',
        team: 'Los Angeles Lakers', //4
        id: '999',
        cost: '999 UST',
        jersey: '24',
        positions: ['SG'],
        avgscore: '96.0',
        grad1: 'indigo-purple',
        grad2: 'indigo-purplegrad',
        listing: '12/12/2025', //7
        rarity: 'silver',
        lowestask: '999 UST',
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

const Marketplace = () => {
    const [searchText, setSearchText] = useState("")
    const [loading, setLoading] = useState(true)
    
    const { list: salesList, status } = useSelector((state) => state.external.playible.salesOrder);

    const dispatch = useDispatch();
    const connectedWallet = useConnectedWallet();
    const [sortedList, setSortedList] = useState([]);


    useEffect(() => {
        if (typeof connectedWallet !== 'undefined') {
            dispatch(getSalesOrders({walletAddr: connectedWallet.walletAddress}))
        }
    }, [dispatch, connectedWallet])

    useEffect(() => {
        if(typeof salesList !== "undefined"){
            setSortedList(salesList)
            setLoading(false)
        }
    }, [salesList])

    return (
        <Container>
          <div className="flex flex-col w-full overflow-y-auto h-screen justify-center self-center md:pb-12">
            <Main color="indigo-white">
                
              {loading ? (
                  <LoadingPageDark/>
              ) : (
                <div className="flex flex-col w-full overflow-y-auto overflow-x-hidden h-screen self-center text-indigo-black">
                  <div className="md:ml-6 flex flex-col md:flex-row md:justify-between">
                      <PortfolioContainer textcolor="indigo-black" title="MARKETPLACE"/>
                      <Sorter
                        list={sortedList}
                        setList={setSortedList}
                        setSearchText={setSearchText}
                      />
                  </div>
    
                  <div className="flex flex-col w-full text-indigo-black">
                    <div className="justify-center self-center w-full md:mt-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 md:mt-12">
                            {sortedList.map(function (player, i) {
                                const toFindName = player.name.toLowerCase()
                                // const toFindTeam = player.team.toLowerCase()
                                const searchInfo = searchText.toLowerCase()
                                if (toFindName.includes(searchInfo) || player.jersey.includes(searchInfo))
                                    return (
                                        <Link href={{
                                            pathname: '/AssetDetails',
                                            query: { id: player.id, origin: 'marketplace' }                                                    
                                        }}>
                                            <div>
                                                <MarketplaceContainer AthleteName={player.name} id={player.id} LowAsk={player.price}/>
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Main>
          </div>
        </Container>
      )
}

export default Marketplace;