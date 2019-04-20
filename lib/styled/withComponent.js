import styled from './index'

const withComponent = function(tagOrComp) {
    const newStyled = styled.hasOwnProperty(tagOrComp)
        ? styled[tagOrComp]()
        : styled(tagOrComp)();
    newStyled.$_interpolations = [
        ...this.$_interpolations
    ];
    return newStyled;
}

export default withComponent;
