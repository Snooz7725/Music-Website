import { useParams } from "react-router-dom"
import { Navigate } from "react-router-dom"
import "./creator_profile.css"
import Sidebar from "../components/sidebar"
import Category from "../components/category"
import CategoryCard from "../components/album_category_card"
import musicData from "../data/db.json"

function CreatorProfile() {
    const { artists, albums, songs } = musicData
    const params = useParams()
    const routeCreatorId = Number(params.name)
    if (isNaN(routeCreatorId)) {
        <Navigate to="/" replace/>
    }

    const chosenCreator = artists.filter(artist => artist.id === routeCreatorId)
    if (typeof albumData == "undefined") {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="app-wrapper">
            <Sidebar />
        </div>
    )
}

export default CreatorProfile
