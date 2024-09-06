import Button from "@/components/button/button"
import FloatingButton from "@/components/button/floatingbutton"

export default function Signup() {

    const testEvent = () => {
        console.log("이벤트실행 테스트");
    }

    return (
        <div className="w-1/4">
            {/* <Button option="solid" size="large" text="테스트" disabled={false}/> */}
            <FloatingButton option='cancel' text='할 일 추가' disabled={false} />
            <FloatingButton option='add' text='할 일 추가' disabled={false} onClick={testEvent}/>
            <FloatingButton option='success' text='할 일 추가' disabled={false} />
        </div>
    )
}