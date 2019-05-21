<template>
    <styled-base class="some-class some-other-class" id="styled-base" />
</template>

<script>
import Base from './Base.vue'
import styled from '../styled'

const StyledBase = styled(Base)`
    display: flex;
`

export default {
    components: {
        StyledBase,
    }
}
</script>
