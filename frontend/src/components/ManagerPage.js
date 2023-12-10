import List from "./List"
import SideBarManager from "./SideBarManager"
import UserHeader from "./UserHeader"

function ManagerPage()  {
    return <>
        <div style={{ width: '250px', float: 'left' }}>
        <SideBarManager />
        </div>
        <div style={{ marginLeft: '230px' }}>
        <UserHeader />
        <List header="Lista siłowni"/>
        <List header="Lista sprzętu"/>
        </div>
    </>
}
export default ManagerPage