import uniqueArray from "../utils/uniqueArray.js";


describe('uniqueArray.js', () => {
    //하위 메소드가 있는게 아니라 단독으로 움직이는 것이므로 바로test를 한다.
    test('중복 제거 확인 number', () => {
        expect(uniqueArray([0, 1, 1])).toStrictEqual([0, 1]);
    });

    test('중복 제거 확인 string', () => {
        expect(uniqueArray(['아', '이', '이'])).toStrictEqual(['아','이']);
    });
});