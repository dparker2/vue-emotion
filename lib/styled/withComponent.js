import styled from './index'

const withComponent = function(tagOrComp) {
    if (styled.hasOwnProperty(tagOrComp)) {
        return styled[tagOrComp](...this.$_interpolations);
    } else {
        return styled(tagOrComp)(...this.$_interpolations);
    }
}

export default withComponent;
