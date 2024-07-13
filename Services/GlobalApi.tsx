import axios from "axios";
import { GOOGLEMAP_KEY } from "@env";

const BASE_URL="https://maps.googleapis.com/maps/api/place"
const API_KEY="<Your Google MAP API KEY>"


const searchByText=(searchText)=>axios.get(BASE_URL+
    "/textsearch/json?query="+searchText+
    "&key="+GOOGLEMAP_KEY
)

export default{
    searchByText
}