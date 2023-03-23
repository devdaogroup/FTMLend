import { Dispatch, SetStateAction, useMemo } from 'react'

import { BigNumber } from '@ethersproject/bignumber'

import { HealthFactor } from '@/src/components/common/HealthFactor'
import { Button, Row, RowKey, RowValue } from '@/src/components/common/StepsCard'
import { Amount } from '@/src/components/helpers/Amount'
import { TokenIcon } from '@/src/components/token/TokenIcon'
import { TokenInput } from '@/src/components/token/TokenInput'
import { TokenWithType } from '@/src/config/agaveTokens'
import { useNewHealthFactorCalculator } from '@/src/hooks/presentation/useNewHealthFactor'
import { Stepper } from '@/src/pagePartials/markets/stepper'
import { useWithdrawStepInitial } from '@/src/pagePartials/markets/withdraw/hooks/useWithdrawStepInitial'

interface InitialWithdrawStepInfoProps {
  amount: string
  maxToWithdraw: BigNumber
  tokenAddress: string
  tokenInfo: TokenWithType
}

const InitialWithdrawStepInfo: React.FC<InitialWithdrawStepInfoProps> = ({
  amount,
  maxToWithdraw,
  tokenAddress,
  tokenInfo,
}) => {
  const sanitizedAmount = useMemo(() => BigNumber.from(amount ? amount : 0), [amount])
  const newHealthFactor = useNewHealthFactorCalculator(tokenAddress).newHealthFactor({
    amount: sanitizedAmount,
    type: 'withdraw',
  })

  return (
    <>
      <Row>
        <RowKey>Available to withdraw</RowKey>
        <RowValue>
          <TokenIcon dimensions={18} symbol={tokenInfo.symbol} />
          <Amount
            decimals={tokenInfo.decimals}
            displayDecimals={tokenInfo.decimals}
            symbol=""
            value={maxToWithdraw}
          />
        </RowValue>
      </Row>
      <Row variant="dark">
        <RowKey>New health factor</RowKey>
        <RowValue>
          <HealthFactor badgeVariant="light" size="sm" value={newHealthFactor} variant="light" />
        </RowValue>
      </Row>
    </>
  )
}

interface InitialWithdrawStepProps {
  amount: string
  nextStep: () => void
  setAmount: Dispatch<SetStateAction<string>>
  tokenAddress: string
}

export const InitialWithdrawStep: React.FC<InitialWithdrawStepProps> = ({
  amount,
  nextStep,
  setAmount,
  tokenAddress,
}) => {
  const {
    disableSubmit,
    maxToWithdraw,
    setTokenInputStatus,
    setTokenInputStatusText,
    tokenInfo,
    tokenInputStatus,
    tokenInputStatusText,
  } = useWithdrawStepInitial({ amount, tokenAddress })

  const stepperProps = {
    info: (
      <InitialWithdrawStepInfo
        amount={amount}
        maxToWithdraw={maxToWithdraw}
        tokenAddress={tokenAddress}
        tokenInfo={tokenInfo}
      />
    ),
    title: 'Amount to withdraw',
    titleButton: { onClick: () => setAmount(maxToWithdraw.toString()), text: 'Use max' },
  }

  return (
    <Stepper {...stepperProps}>
      <TokenInput
        address={tokenAddress}
        decimals={tokenInfo.decimals}
        maxValue={maxToWithdraw.toString()}
        setStatus={setTokenInputStatus}
        setStatusText={setTokenInputStatusText}
        setValue={setAmount}
        status={tokenInputStatus}
        statusText={tokenInputStatusText}
        symbol={tokenInfo.symbol}
        value={amount}
      />
      <Button disabled={disableSubmit} onClick={nextStep}>
        Withdraw
      </Button>
    </Stepper>
  )
}
