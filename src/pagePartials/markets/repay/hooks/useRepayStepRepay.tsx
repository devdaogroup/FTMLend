import { useCallback } from 'react'

import { usePageModeParam } from '@/src/hooks/presentation/usePageModeParam'
import useGetUserAccountData from '@/src/hooks/queries/useGetUserAccountData'
import { useGetUserReservesData } from '@/src/hooks/queries/useGetUserReservesData'
import { useContractInstance } from '@/src/hooks/useContractInstance'
import useTransaction from '@/src/hooks/useTransaction'
import { StepWithActions, useStepStates } from '@/src/pagePartials/markets/stepper'
import { useWeb3ConnectedApp } from '@/src/providers/web3ConnectionProvider'
import { AgaveLending__factory } from '@/types/generated/typechain'

export const useRepayStepRepay = ({
  amount,
  tokenAddress,
}: {
  amount: string
  tokenAddress: string
}) => {
  const interestRateMode = usePageModeParam()
  const { address: userAddress } = useWeb3ConnectedApp()
  const agaveLending = useContractInstance(AgaveLending__factory, 'AgaveLendingPool')
  const sendTx = useTransaction()
  const { mutate: refetchUserReservesData } = useGetUserReservesData()
  const [, refetchUserAccountData] = useGetUserAccountData(userAddress)

  const repay = useCallback(async () => {
    const tx = await sendTx(() =>
      agaveLending.repay(tokenAddress, amount, interestRateMode, userAddress),
    )
    const receipt = await tx.wait()
    refetchUserReservesData()
    refetchUserAccountData()
    return receipt.transactionHash
  }, [
    sendTx,
    refetchUserReservesData,
    refetchUserAccountData,
    agaveLending,
    tokenAddress,
    amount,
    interestRateMode,
    userAddress,
  ])

  return useStepStates({
    title: 'Repay',
    description: 'Submit to repay',
    status: 'idle',
    actionText: 'Repay',
    async mainAction() {
      this.loading()

      try {
        const txHash = await repay()
        this.nextStep(txHash)
      } catch (e) {
        this.failed()
      }
    },
  } as StepWithActions)
}
