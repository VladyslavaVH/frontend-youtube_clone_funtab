import { videoAPI } from "../api/api";
const INITIALIZE = 'INITIALIZE';

let initialState = {
    loading: true,
    titleText: null,
    name: null,
    description: null,
    poster: null,
    isLiked: false,
    isDisliked: false,
    likes: 0,
    dislikes: 0,
    views: 0,
    date: null,
    channelName: null,
    channelId: 0,
    icon: null,
    imgUrl: null,
    comments: [],
    offerList: []
};

const videoReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE:            
            return {
                ...state,
                loading: false,
                titleText: action.data.video.title,
                name: action.data.video.name,
                description: action.data.video.description,
                poster: action.data.video.poster,
                isLiked: action.data.video.isLiked,
                isDisliked: action.data.video.isDisliked,
                likes: action.data.video.totalLikesCount,
                dislikes: action.data.video.totalDislikesCount,
                views: action.data.video.totalViewsCount,
                date: action.data.video.dateCreate,
                channelName: action.data.channel.name,
                channelId: action.data.channel.id,
                icon: action.data.channel.icon,
                imgUrl: action.data.channel.imgUrl,
                comments: action.data.comments,
                offerList: action.data.offerLists
            };
        
        default:
            return state;
    }
}

export const initialize = (data) => ({ type: INITIALIZE, data: { ...data } });

export const initializeVideoPage = (id, channelId) => (dispatch) => {
    videoAPI.initializePage(id, channelId).then(response => {
        if (response.status === 200) {
            console.log(response.data);
            dispatch(initialize(response.data));
        }        
    });
}

export default videoReducer;