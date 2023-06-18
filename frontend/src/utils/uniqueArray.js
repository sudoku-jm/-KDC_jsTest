//리스트 중복 제거 후 리턴.
export default function uniqueArray(list) {

    //Set사용
    return Array.from(new Set(list));
}