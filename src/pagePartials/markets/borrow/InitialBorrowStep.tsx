import { Dispatch, SetStateAction, useMemo } from 'react'

import { BigNumber } from '@ethersproject/bignumber'

import { HealthFactor } from '@/src/components/common/HealthFactor'
import { Button, Row, RowKey, RowValue } from '@/src/components/common/StepsCard'
import { Amount } from '@/src/components/helpers/Amount'
import { ToggleWrap } from '@/src/components/token/ToggleWrap'
import { TokenIcon } from '@/src/components/token/TokenIcon'
import { TokenInput } from '@/src/components/token/TokenInput'
import { TokenWithType } from '@/src/config/agaveTokens'
import { useNewHealthFactorCalculator } from '@/src/hooks/presentation/useNewHealthFactor'
import { useBorrowStepInitial } from '@/src/pagePartials/markets/borrow/hooks/useBorrowStepInitial'
import { Stepper } from '@/src/pagePartials/markets/stepper'

interface InitialBorrowStepInfoProps {
  amount: string
  maxToBorrow: BigNumber
  tokenAddress: string
  tokenInfo: TokenWithType
}

const InitialBorrowStepInfo: React.FC<InitialBorrowStepInfoProps> = ({
  amount,
  maxToBorrow,
  tokenAddress,
  tokenInfo,
}) => {
  const sanitizedAmount = useMemo(() => BigNumber.from(amount ? amount : 0), [amount])
  const newHealthFactor = useNewHealthFactorCalculator(tokenAddress).newHealthFactor({
    amount: sanitizedAmount,
    type: 'borrow',
  })

  return (
    <>
      <Row>
        <RowKey>Available to borrow</RowKey>
        <RowValue>
          <TokenIcon dimensions={18} symbol={tokenInfo.symbol} />
          <Amount
            decimals={tokenInfo.decimals}
            displayDecimals={tokenInfo.decimals}
            symbol=""
            value={maxToBorrow}
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

interface InitialBorrowStepProps {
  amount: string
  nextStep: () => void
  setAmount: Dispatch<SetStateAction<string>>
  tokenAddress: string
}

export const InitialBorrowStep: React.FC<InitialBorrowStepProps> = ({
  amount,
  nextStep,
  setAmount,
  tokenAddress,
}) => {
  const {
    disableSubmit,
    maxToBorrow,
    setTokenInputStatus,
    setTokenInputStatusText,
    tokenInfo,
    tokenInputStatus,
    tokenInputStatusText,
  } = useBorrowStepInitial({ amount, tokenAddress })

  const onToggleWrap = (isWrapped: boolean) => {
    console.log(isWrapped)
  }

  const isXDAI = tokenInfo.symbol.toLowerCase() === 'xdai'
  const isWXDAI = tokenInfo.symbol.toLowerCase() === 'wxdai'

  const stepperProps = {
    info: (
      <InitialBorrowStepInfo
        amount={amount}
        maxToBorrow={maxToBorrow}
        tokenAddress={tokenAddress}
        tokenInfo={tokenInfo}
      />
    ),
    title: 'Amount to borrow',
    titleButton: { onClick: () => setAmount(maxToBorrow.toString()), text: 'Use max' },
    tokenWrapper:
      isXDAI || isWXDAI ? <ToggleWrap isWrapped={isWXDAI} onChange={onToggleWrap} /> : null,
  }

  return (
    <Stepper {...stepperProps}>
      <TokenInput
        address={tokenAddress}
        decimals={tokenInfo.decimals}
        maxValue={maxToBorrow.toString()}
        setStatus={setTokenInputStatus}
        setStatusText={setTokenInputStatusText}
        setValue={setAmount}
        status={tokenInputStatus}
        statusText={tokenInputStatusText}
        symbol={tokenInfo.symbol}
        value={amount}
      />
      <Button disabled={disableSubmit} onClick={nextStep}>
        Borrow
      </Button>
    </Stepper>
  )
}
