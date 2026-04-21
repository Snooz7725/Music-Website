import Sidebar from "../components/sidebar"
import "./no_match.css"

function NoMatch() {
    return (
        <div className="no-match-wrapper">
            <Sidebar />
            <div className="error-message">
                <h1>Error 404 - Not Found</h1>
            </div>
        </div>
    )
}

export default NoMatch