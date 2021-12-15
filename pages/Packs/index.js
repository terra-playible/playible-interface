import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import React, { Component, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PortfolioContainer from '../../components/containers/PortfolioContainer';
import LargePackContainer from '../../components/containers/LargePackContainer';
import Container from '../../components/containers/Container';
import Main from '../../components/Main'
import { packList } from './data'

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

        console.log(data)
    }

    return (
        <Container>
            <div className="flex flex-col w-screen md:w-full overflow-y-auto h-screen justify-center self-center md:pb-12">
                <Main color="indigo-white">
                    <div className="flex flex-col">
                        <PortfolioContainer textcolor="indigo-black" title="PACKS">
                            <div className="flex flex-col mt-4 md:ml-6 self-center md:self-auto">
                                <div className="md:ml-7 grid grid-cols-1 gap-x-2 gap-y-8 md:grid-cols-4 mt-4 md:mt-12 mb-12">
                                    {
                                        packList.map(function (pack, i) {
                                            const toFindName = pack.name.toLowerCase()
                                            const searchInfo = result.toLowerCase()
                                            if (toFindName.includes(searchInfo))
                                                return (
                                                    <div className="w-full">
                                                        <a href={`/PackDetails?id=${pack.key}`}>
                                                            <div className="" key={i}>
                                                                <LargePackContainer
                                                                    PackName={pack.name}
                                                                    CoinValue={pack.price}
                                                                    releaseValue={pack.release}
                                                                    imagesrc={pack.image} />
                                                            </div>
                                                        </a>
                                                    </div>
                                                )
                                        })
                                    }
                                </div>
                            </div>
                        </PortfolioContainer>
                    </div>
                </Main>
            </div>
        </Container>
    )
}
