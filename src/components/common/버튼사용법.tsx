import Button from "@/components/common/Button"
import FloatingButton from "@/components/common/FloatingButton"

export default function test() {

    const testEvent = () => {
        console.log("이벤트실행 테스트");
    }  
    //사용하는 버튼 스타일에 맞춰 옵션값을 solid, outlined, outlinedSecondary, danger를 배치하면된다.
    //outlineSecondary의 경우 피그마 시안에 hover, active, disabled 값의 설정이 없어서 추가하지 않았다.
    //사이즈의 large는 할당된 크기만큼 들어가도록 하였고 xmall은 피그마 시안값으로 정해놨다.

    //플로팅 버튼의 경우 addm success, cancel로 구분하였다.
    //피그마 시안의 경우 고정된 값이여서 현재는 고정시켰다.
    //멘토링때 진행했던 이야기로 동적할당을 위해 full로 변경을 고려하고있다.
    return (
        <div className="w-1/4">
            <Button option="solid" size="large" text="테스트" disabled={false}/>
            <FloatingButton option='cancel' text='완료취소' disabled={false} />
            <FloatingButton option='add' text='할 일 추가' disabled={false} onClick={testEvent}/>
            <FloatingButton option='success' text='완료하기' disabled={false} />
        </div>
    )
}