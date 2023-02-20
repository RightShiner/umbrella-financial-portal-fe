import Sidebar from "../scenes/global/Sidebar";
import Topbar from "../scenes/global/Topbar";

export default function MainLayout(props) {
    return <div className="app">
        <Sidebar isSidebar={props.isSidebar} />
        <main className="content">
            <Topbar setIsSidebar={props.setIsSidebar} />
            {props.children}
        </main>
    </div>
}