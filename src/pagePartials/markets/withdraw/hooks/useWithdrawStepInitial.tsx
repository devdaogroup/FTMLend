import { useState } from 'react'

import { BigNumber } from '@ethersproject/bignumber'
import { Zero } from '@ethersproject/constants'

import { TextfieldStatus } from '@/src/components/form/Textfield'
import { agaveTokens } from '@/src/config/agaveTokens'
import { useAccountBalance } from '@/src/hooks/useAccountBalance'
import { useWeb3ConnectedApp } from '@/src/providers/web3ConnectionProvider'

export function useWithdrawStepInitial({
  amount,
  tokenAddress,
}: {
  amount: string
  tokenAddress: string
}) {
  const tokenInfo = agaveTokens.getTokenByAddress(tokenAddress)
  const agTokenInfo = agaveTokens
    .getRelatedTokensByAddress(tokenAddress)
    .find(({ type }) => type === 'ag')

  if (!agTokenInfo) {
    throw Error(`AG Token not found for ${tokenInfo.symbol} (${tokenInfo.address})`)
  }

  const { address: accountAddress } = useWeb3ConnectedApp()
  const { balance } = useAccountBalance({ accountAddress, tokenAddress: agTokenInfo.address })

  const [tokenInputStatus, setTokenInputStatus] = useState<TextfieldStatus>()
  const [tokenInputStatusText, setTokenInputStatusText] = useState<string | undefined>()

  const disableSubmit =
    tokenInputStatus === TextfieldStatus.error || !amount || BigNumber.from(amount).eq(Zero)

  return {
    tokenInfo,
    maxToWithdraw: balance,
    setTokenInputStatus,
    setTokenInputStatusText,
    tokenInputStatus,
    tokenInputStatusText,
    disableSubmit,
  }
}
