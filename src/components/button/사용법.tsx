import Button from "@/components/button/Button"
import FloatingButton from "@/components/button/FloatingButton"

export default function test() {

    const testEvent = () => {
        console.log("이벤트실행 테스트");
    }

    return (
        <div className="w-1/4">
            <Button option="solid" size="large" text="테스트" disabled={false}/>
            <FloatingButton option='cancel' text='완료취소' disabled={false} />
            <FloatingButton option='add' text='할 일 추가' disabled={false} onClick={testEvent}/>
            <FloatingButton option='success' text='완료하기' disabled={false} />
        </div>
    )
}