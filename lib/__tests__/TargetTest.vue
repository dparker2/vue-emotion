<template>
    <styled-wrapper>
        <styled-div>
            <styled-base id="styled-base" />
        </styled-div>
    </styled-wrapper>
</template>

<script>
import Base from './Base.vue'
import styled from '../styled'

const StyledBase = styled(Base)`
    display: flex;
`

const StyledDiv = styled.div`
    ${StyledBase} {
        color: red;
    }
`

const StyledWrapper = styled.section`
    ${StyledDiv} ${StyledBase} {
        font-size: 20px;
    }
`

export default {
    components: {
        StyledWrapper,
        StyledBase,
        StyledDiv
    }
}
</script>
