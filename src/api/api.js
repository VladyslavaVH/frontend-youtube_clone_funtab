import axios from 'axios';

const instance = axios.create({
    //withCredentials: true,
    baseURL: 'https://api.funtab.com.ua/',
    headers: {
        "Content-Type": 'application/json',
    }
});

export const registerAPI = {
    registration(data) {
        return instance.post('/user/user_creation.php', data);
    },
    verifyCode(email, code) {//email resend: list with code
        return instance.put('/user/user_activation.php', {email, code});
    },
    resendCode(repeat, email) {
        return instance.put('/user/user_activation.php', {repeat, email});
    }
}

export const loginAPI = {
    auth(email, password) {
        return instance.post('/user/user_login.php', {email, password});
    }
}

export const videoAPI = {
    initializePage(id, channelId) {
        return instance.get(
            `/video/video_read_one.php?id=${id}&channelId=${channelId}&jwt=${localStorage.getItem('jwt')}`
        );
    }
}

const tags = [
    'Text', 'Tree', 'Minecraft', 'let’s play', 'нафаня', 'Комаровский', 'фан таб', 'Fontan', 'cats', 'absde', 'figma', 'Mixes', 
    'Conversation', 'Gaming', 'minecraft bedrock', 'books', 'sports car', 'vDud', 'Rapping', 'Animals', 'Conversation', 'html',
    'web-design', 'c#', 'devOps'
]

const subscriptions = [
    {id: 1, channelName: 'FGH', channelImg: '1.png'},
    {id: 2, channelName: 'Fronte de Reno', channelImg: '2.png'},
    {id: 3, channelName: 'Avatar', channelImg: 'avatar.jpg'},
    {id: 4, channelName: 'Тузли Фрупэо', channelImg: '3.png'},
    {id: 5, channelName: 'Vbotnik', channelImg: '4.png'},
    {id: 6, channelName: 'Хард пусус', channelImg: '5.png'},
    {id: 7, channelName: 'gorpin servers', channelImg: '6.png'},
    {id: 8, channelName: 'FG', channelImg: '7.png'},
    {id: 9, channelName: 'test_8', channelImg: '8.png'},
    {id: 10, channelName: 'test_9', channelImg: '9.png'},
    {id: 11, channelName: 'test_10', channelImg: '10.png'},
    {id: 12, channelName: 'test_11', channelImg: '11.png'},
    {id: 13, channelName: 'test_12', channelImg: '12.png'},
];

const authVideoCards = [
    { id: 1, video: 'Avatar_The_Way_of_Water_Official_Teaser_Trailer.mp4', videoName: 'Avatar: The Way of Water | Official Teaser Trailer', channelName: 'Avatar', views: '22M', likes: '65K', lastVisit: '1 month ago', videoPoster: null, channelImg: 'avatar.jpg' },
    { id: 2, video: null, videoName: 'Ultrices nibh justo, varius erat facilisis. Sem sit ante est ac lobortis id tellus donec.', channelName: 'Enim pulvinar', views: 230, likes: 500, lastVisit: '10 days ago', videoPoster: '2.jpg', channelImg: 'testChannelImage.jpg' },
    { id: 3, video: null, videoName: 'Risus risus morbi enim cras et dignissim orci facilisis. Nibh amet, nisi purus enim', channelName: 'Tincidunt nulla', views: 230, likes: 500, lastVisit: '10 days ago', videoPoster: '3.jpg', channelImg: 'testChannelImage.jpg' },
    { id: 4, video: null, videoName: 'Eu imperdiet sagittis, vestibulum vulputate arcu velit, nulla sed sed.', channelName: 'Congue vulputate', views: 230, likes: 500, lastVisit: '10 days ago', videoPoster: '4.jpg', channelImg: 'testChannelImage.jpg' },
    { id: 5, video: null, videoName: 'Diam enim pretium sit convallis justo.', channelName: 'Lectus', views: 230, likes: 500, lastVisit: '10 days ago', videoPoster: '5.png', channelImg: 'testChannelImage.jpg' },
    { id: 6, video: null, videoName: 'Accumsan mus suspendisse nunc quis elit amet mauris egestas.', channelName: 'Mauris amet mauris', views: 230, likes: 500, lastVisit: '10 days ago', videoPoster: '6.jpg', channelImg: 'testChannelImage.jpg' },
    { id: 7, video: null, videoName: 'Tempor nisi, risus nec, facilisis orci lectus lorem nibh ornare.', channelName: 'Non', views: 230, likes: 500, lastVisit: '10 days ago', videoPoster: '7.jpg', channelImg: 'testChannelImage.jpg' },
    { id: 8, video: null, videoName: 'Interdum ut sollicitudin elit et mauris.', channelName: 'Nulla odio ullamcorper interdum', views: 230, likes: 500, lastVisit: '10 days ago', videoPoster: '8.jpg', channelImg: 'testChannelImage.jpg' },
    { id: 9, video: null, videoName: 'Diam enim pretium sit convallis justo.', channelName: 'Lectus', views: 230, likes: 500, lastVisit: '10 days ago', videoPoster: '9.jpg', channelImg: 'testChannelImage.jpg' },
    { id: 10, video: null, videoName: 'Accumsan mus suspendisse nunc quis elit amet mauris egestas.', channelName: 'Mauris amet mauris', views: 230, likes: 500, lastVisit: '10 days ago', videoPoster: '10.jpg', channelImg: 'testChannelImage.jpg' },
    { id: 11, video: null, videoName: 'Tempor nisi, risus nec, facilisis orci lectus lorem nibh ornare.', channelName: 'Non', views: 230, likes: 500, lastVisit: '10 days ago', videoPoster: '11.jpg', channelImg: 'testChannelImage.jpg' },
    { id: 12, video: null, videoName: 'Interdum ut sollicitudin elit et mauris.', channelName: 'Nulla odio ullamcorper interdum', views: 230, likes: 500, lastVisit: '10 days ago', videoPoster: '12.jpg', channelImg: 'testChannelImage.jpg' },
];

const searchOptions = [
    'video', 'video games', 'video editing apps', 'vikeoke songs'
]

const notifications = [
    { id: 1, text: 'notifications' },
    { id: 2, text: 'notifications 2' }
]

const myChannels = [
    { id: 2, name: 'Blue channel', icon: 'channel2.jpg', wallpapers: '' },
    { id: 3, name: 'Pink channel', icon: 'channel3.jpg', wallpapers: '' }
]

export const API = {
    getChannelById(id) {
        for (const c of myChannels) {
            if (c.id == id) {
                return c;
            }
        }
    }
}

export const authAPI = {
    authorization() {
        return instance
        .get(`/user/user_validate.php?jwt=${localStorage.getItem('jwt')}`);
    },
    signIn(data) {
        return instance
        .post('/user/user_creation.php', data);
    },
    getTags() {
        //return instance.get(`auth/me`);
        //return tags;
    },
    getSubs() {
        return subscriptions;
    },
    getVideos() {
        return authVideoCards;
    },
    getSearchOptions() {
        return searchOptions;
    },
    getNotifications() {
        return notifications;
    },
    getBlueChannels() {
        const subs = subscriptions;
        const videos = authVideoCards;
        let res = [];
        for (const card of videos) {
            for (const sub of subs) {
                if (sub.channelName == card.channelName) {
                    res.push(sub.channelName);
                }
            }
        }
    
        return res;
    },
    getMyChannels() {
        return myChannels;
    }
}

const unAuthTags = [
    'minecraft bedrock', 'books', 'sports car', 'vDud', 'Rapping', 'Animals', 'Conversation', 'html',
    'web-design', 'c#', 'devOps', 'Text', 'Tree', 'Minecraft', 'let’s play', 'нафаня', 'Комаровский', 'фан таб', 'Fontan', 'cats', 'absde', 'figma', 'Mixes', 
    'Conversation', 'Gaming', 
]

const unAuthVideoCards = [
    { id: 1, video: null, videoName: 'Official Teaser Trailer', channelName: 'Test', views: '15', likes: '56', lastVisit: '7 days ago', videoPoster: '1.jpg', channelImg: '1.png' },
    { id: 2, video: null, videoName: 'Ultrices nibh justo, varius erat facilisis. Sem sit ante est ac lobortis id tellus donec.', channelName: 'Enim pulvinar', views: 230, likes: 500, lastVisit: '10 days ago', videoPoster: '2.jpg', channelImg: 'testChannelImage.jpg' },
    { id: 3, video: null, videoName: 'Risus risus morbi enim cras et dignissim orci facilisis. Nibh amet, nisi purus enim', channelName: 'Tincidunt nulla', views: 230, likes: 500, lastVisit: '10 days ago', videoPoster: '3.jpg', channelImg: 'testChannelImage.jpg' },
    { id: 4, video: null, videoName: 'Eu imperdiet sagittis, vestibulum vulputate arcu velit, nulla sed sed.', channelName: 'Congue vulputate', views: 230, likes: 500, lastVisit: '10 days ago', videoPoster: '4.jpg', channelImg: 'testChannelImage.jpg' },
    { id: 5, video: null, videoName: 'Diam enim pretium sit convallis justo.', channelName: 'Lectus', views: 230, likes: 500, lastVisit: '10 days ago', videoPoster: '5.png', channelImg: 'testChannelImage.jpg' },
    { id: 6, video: null, videoName: 'Accumsan mus suspendisse nunc quis elit amet mauris egestas.', channelName: 'Mauris amet mauris', views: 230, likes: 500, lastVisit: '10 days ago', videoPoster: '6.jpg', channelImg: 'testChannelImage.jpg' },
    { id: 7, video: null, videoName: 'Tempor nisi, risus nec, facilisis orci lectus lorem nibh ornare.', channelName: 'Non', views: 230, likes: 500, lastVisit: '10 days ago', videoPoster: '7.jpg', channelImg: 'testChannelImage.jpg' },
    { id: 8, video: null, videoName: 'Interdum ut sollicitudin elit et mauris.', channelName: 'Nulla odio ullamcorper interdum', views: 230, likes: 500, lastVisit: '10 days ago', videoPoster: '8.jpg', channelImg: 'testChannelImage.jpg' },
    { id: 9, video: null, videoName: 'Diam enim pretium sit convallis justo.', channelName: 'Lectus', views: 230, likes: 500, lastVisit: '10 days ago', videoPoster: '9.jpg', channelImg: 'testChannelImage.jpg' },
    { id: 10, video: null, videoName: 'Accumsan mus suspendisse nunc quis elit amet mauris egestas.', channelName: 'Mauris amet mauris', views: 230, likes: 500, lastVisit: '10 days ago', videoPoster: '10.jpg', channelImg: 'testChannelImage.jpg' },
    { id: 11, video: null, videoName: 'Tempor nisi, risus nec, facilisis orci lectus lorem nibh ornare.', channelName: 'Non', views: 230, likes: 500, lastVisit: '10 days ago', videoPoster: '11.jpg', channelImg: 'testChannelImage.jpg' },
    { id: 12, video: null, videoName: 'Interdum ut sollicitudin elit et mauris.', channelName: 'Nulla odio ullamcorper interdum', views: 230, likes: 500, lastVisit: '10 days ago', videoPoster: '12.jpg', channelImg: 'testChannelImage.jpg' },
];

export const unAuthAPI = {
    getTags() {
        //return instance.get(`auth/me`);
        //return unAuthTags;
        return instance.get('/tag-standart/read_tags.php');
    },
    getVideos() {
        return unAuthVideoCards;
    }
}