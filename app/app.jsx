import React, { Component } from "react";
import ReactDom from "react-dom";
import gAPIKEY from "../env";
import SearchBar from "./components/search_bar";
import YTSearch from "youtube-api-search";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";
import _ from "lodash";

const API_KEY = gAPIKEY.gAPIKEY() || process.env.GKEY;


//Main Objective
//Create a new component. This component should produce some HTMl

class App extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            videos: [],
            selectedVideo: null
         };

         this.videoSearch("surfboards");        
    }

    videoSearch(term) {
        YTSearch ({key: API_KEY, term: term}, (videos) => {
            this.setState({ 
                videos: videos,
                selectedVideo: videos[0]
            });
        });

    }

    render() {

        const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300)

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList 
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos} />
            </div>
        );
    }
    
}

//Take this component's generated html and put it on the page

ReactDom.render(<App />, document.querySelector('.container'));
