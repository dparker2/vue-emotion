import { mount } from '@vue/test-utils';
import { expectStyle } from './utils';
import Base from './Base.vue';
import styled from '../styled';

/**
 * Some helper style variables
 */
const color = 'rgb(0, 0, 225)';
const height = '200px';
const heightNum = 200;
const display = 'flex';

describe('styled', () => {
    test('works if component has another mixin', () => {
        let mixinCalled = false;
        const WithMixin = {
            ...Base,
            mixins: [{
                mounted() { mixinCalled = true; }
            }]
        };
        const StyledComp = styled(WithMixin)`
            display: ${display};
        `;
        const { element } = mount(StyledComp);
        expect(mixinCalled).toEqual(true);
        expectStyle(element, 'display', display);
    });

    test('adds style to component', () => {
        const StyledBase = styled(Base)`
            color: ${color};
            height: ${height};
        `;
        const { element } = mount(StyledBase);
        expectStyle(element, 'color', color);
        expectStyle(element, 'height', height);
    });

    test('adds style to basic tag', () => {
        const StyledAnchor = styled.a`
            height: ${height};
        `;
        const { element } = mount(StyledAnchor);
        expectStyle(element, 'height', height);
    });

    test('prop function', () => {
        const StyledBase = styled(Base)`
            color: ${props => props.color};
        `;
        const wrapper = mount(StyledBase, {
            propsData: { color }
        });
        expectStyle(wrapper.element, 'color', color);
    });

    test('merges template styles', () => {
        const AlreadyStyled = styled(Base)`
            color: ${color};
        `;
        const StyledComp = styled(AlreadyStyled)`
            height: ${height};
        `;
        const { element: mergedEl} = mount(StyledComp);
        expectStyle(mergedEl, 'color', color);
        expectStyle(mergedEl, 'height', height);
        const { element } = mount(AlreadyStyled);
        expectStyle(element, 'height', '');
    });

    test('merges object styles', () => {
        const AlreadyStyled = styled(Base)({
            color
        });
        const StyledComp = styled(AlreadyStyled)({
            height
        });
        const { element: mergedEl} = mount(StyledComp);
        expectStyle(mergedEl, 'color', color);
        expectStyle(mergedEl, 'height', height);
        const { element } = mount(AlreadyStyled);
        expectStyle(element, 'height', '');
    });

    test('merges template and object styles', () => {
        const AlreadyStyled = styled(Base)`
            color: ${color};
        `;
        const StyledComp = styled(AlreadyStyled)({
            height
        });
        const { element: mergedEl} = mount(StyledComp);
        expectStyle(mergedEl, 'color', color);
        expectStyle(mergedEl, 'height', height);
        const { element } = mount(AlreadyStyled);
        expectStyle(element, 'height', '');
    });

    test('withComponent puts all styles on new tag', () => {
        const WithColor = styled(Base)`
            color: ${color};
        `;
        const StyledComp = styled(WithColor)`
            display: ${display};
        `;
        const StyledTag = StyledComp.withComponent('section');
        const { element: compEl } = mount(StyledComp);
        const { element: tagEl } = mount(StyledTag);
        expect(compEl.tagName.toLowerCase()).toEqual('div');
        expectStyle(compEl, 'color', color);
        expectStyle(compEl, 'display', display);
        expect(tagEl.tagName.toLowerCase()).toEqual('section');
        expectStyle(tagEl, 'color', color);
        expectStyle(tagEl, 'display', display);
    });

    test('withComponent works with other components', () => {
        const Comp1 = { ...Base, name: 'comp1' };
        const Comp2 = { ...Base, name: 'comp2' };
        const StyledComp1 = styled(styled(Comp1)({
            color
        }))`
            height: ${height};
        `;
        const StyledComp2 = StyledComp1.withComponent(Comp2);
        const wrapper1 = mount(StyledComp1);
        const wrapper2 = mount(StyledComp2);
        expect(wrapper1.name()).toEqual(Comp1.name);
        expectStyle(wrapper1.element, 'color', color);
        expectStyle(wrapper1.element, 'height', height);
        expect(wrapper2.name()).toEqual(Comp2.name);
        expectStyle(wrapper2.element, 'color', color);
        expectStyle(wrapper2.element, 'height', height);
    });
});
