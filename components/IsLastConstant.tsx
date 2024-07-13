export default function isLastConstant(name) {
    const lastChar = name.charAt(name.length - 1);
    
    // 한글의 경우 종성 여부를 판단할 수 있는 범위: 0xAC00 ~ 0xD7A3
    // 한글 자모: 초성(0x1100~0x1112), 중성(0x1161~0x1175), 종성(0x11A8~0x11C2)
    
    const isHangul = (char) => {
        const charCode = char.charCodeAt(0);
        return charCode >= 0xAC00 && charCode <= 0xD7A3;
    };
    
    const hasJongseong = (char) => {
        // 한글의 경우 종성이 있는지 확인
        const lastChar = char.charCodeAt(0) - 0xAC00;
        // 종성이 있는 경우: (lastChar % 28) !== 0
        return (lastChar % 28) !== 0;
    };
    
    if (isHangul(lastChar) && hasJongseong(lastChar)) {
        return "으로";
    } else {
        return "로";
    }
};
