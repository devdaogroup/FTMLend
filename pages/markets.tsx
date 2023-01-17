import { NextPage } from 'next'
import styled from 'styled-components'

import { BaseCard } from '@/src/components/common/BaseCard'
import { BaseTitle } from '@/src/components/text/BaseTitle'
import { agaveTokens } from '@/src/config/agaveTokens'
import { MarketList } from '@/src/pagePartials/markets/MarketList'

const Card = styled(BaseCard)`
  margin-bottom: 30px;

  &:last-child {
    margin-bottom: 0;
  }
`

const Markets: NextPage = () => {
  return (
    <>
      <BaseTitle>Markets</BaseTitle>
      <Card>
        <MarketList tokens={agaveTokens.reserveTokens} />
      </Card>
    </>
  )
}

export default Markets
