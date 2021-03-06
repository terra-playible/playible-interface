import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import React, { Component, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PortfolioContainer from '../../components/containers/PortfolioContainer';
import LargePackContainer from '../../components/containers/LargePackContainer';
import Container from '../../components/containers/Container';
import BackFunction from '../../components/buttons/BackFunction';
import Main from '../../components/Main'
import 'regenerator-runtime/runtime';

export default function Packs() {
    const { status, connect, disconnect, availableConnectTypes } = useWallet();

    const interactWallet = () => {
        if (status === WalletStatus.WALLET_CONNECTED) {
            disconnect();
        } else {
            connect(availableConnectTypes[1]);
        }
    };

    const [filterInfo, handleFilter] = React.useState(false)
    const { register, handleSubmit } = useForm()
    const [result, setResult] = useState("")
    const [teamFilter, setTeamFilter] = useState("")
    const [posFilter, setPosFilter] = useState("")
    const [isClosed, setClosed] = React.useState(true)
    const [filterMode, setMode] = React.useState(false)
    const [showFilter, setFilter] = React.useState(false)

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
    const [isNarrowScreen, setIsNarrowScreen] = useState(false);

    // useEffect(() => {
    //     // set initial value
    //     const mediaWatcher = window.matchMedia("(max-width: 500px)")
    
    //     //watch for updates
    //     function updateIsNarrowScreen(e) {
    //       setIsNarrowScreen(e.matches);
    //     }
    //     mediaWatcher.addEventListener('change', updateIsNarrowScreen)
    
    //     // clean up after ourselves
    //     return function cleanup() {
    //       mediaWatcher.removeEventListener('change', updateIsNarrowScreen)
    //     }
    //   })
    
    // if (isNarrowScreen) {
    return (
        <Container activeName="SQUAD">
            <div className="flex flex-col w-full overflow-y-auto h-screen md:pb-12">
                <Main color="indigo-white">
                    <div className="md:ml-6">
                    <PortfolioContainer textcolor="indigo-black" title="PACKS">
                        <div className="flex flex-col">
                                <div className="grid grid-cols-4 gap-y-8 mt-4 md:grid-cols-4 md:ml-7 md:mt-12">
                                    
                                </div>
                        </div>
                    </PortfolioContainer>
                    </div>
                </Main>
            </div>
        </Container>
    )
}
