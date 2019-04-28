/* eslint-disable no-undef */
export const expectStyle = (element, property, value) => {
    expect(getComputedStyle(element)[property]).toEqual(value);
}