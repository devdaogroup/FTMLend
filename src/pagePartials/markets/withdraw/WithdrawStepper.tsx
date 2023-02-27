import { BigNumber } from '@ethersproject/bignumber'

import { ButtonPrimary } from '@/src/components/buttons/Button'
import { Amount } from '@/src/components/helpers/Amount'
import { agaveTokens } from '@/src/config/agaveTokens'
import { Steps } from '@/src/pagePartials/markets/stepper'
import { useWithdrawSteps } from '@/src/pagePartials/markets/withdraw/hooks/useWithdrawSteps'

interface WithdrawStepperInfoProps {
  amount: string
  tokenAddress: string
}

const WithdrawStepperInfo = ({ amount, tokenAddress }: WithdrawStepperInfoProps) => {
  const tokenInfo = agaveTokens.getTokenByAddress(tokenAddress)
  const newHealthFactor = 0

  return (
    <>
      <div data-id="summary">
        <p>These are your transaction details.</p>
        <p>Please verify them before submitting.</p>
      </div>
      <div data-id="info-amount">
        <div>Amount</div>
        <Amount
          decimals={tokenInfo.decimals}
          symbol={tokenInfo.symbol}
          value={BigNumber.from(amount)}
        />
      </div>
      <div data-id="info-newHealthFactor">
        <div>New health factor</div>
        <div>{newHealthFactor}%</div>
      </div>
    </>
  )
}

interface WithdrawStepperProps {
  amount: string
  cancel: () => void
  tokenAddress: string
}

export function WithdrawStepper({ amount, cancel, tokenAddress }: WithdrawStepperProps) {
  const depositSteps = useWithdrawSteps({
    tokenAddress,
    amount,
  })

  const params = {
    ...depositSteps,
    info: <WithdrawStepperInfo amount={amount} tokenAddress={tokenAddress} />,
    title: 'Withdraw overview',
    titleButton: <ButtonPrimary onClick={cancel}>Cancel</ButtonPrimary>,
  }

  return <Steps {...params} />
}