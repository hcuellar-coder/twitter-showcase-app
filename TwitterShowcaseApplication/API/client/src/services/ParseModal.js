export default function parseModal(mediaArray) {
    let url = '';
    let format = '';
    let video = '';
    let videoContentType = '';
    let text = '';
    for (let media of mediaArray) {
        switch (media.type) {
            case 'photo':
                url = (media.media_url_https).slice(0, -4);
                format = (media.media_url_https).slice(-3);
                text = `<div class="media_photo_div"><Image 
               class="media_photo" src="${url}?format=${format}&name=small" fluid/></div>`;
                break;
            case 'video':
                for (let variant of media.video_info.variants) {
                    let bitrate = 0;
                    if (variant.content_type === 'video/mp4') {
                        if (variant.bitrate > bitrate) {
                            bitrate = variant.bitrate;
                            video = variant.url;
                            videoContentType = variant.content_type;
                        }
                    }
                }
                url = (media.media_url_https).slice(0, -4);
                format = (media.media_url_https).slice(-3);
                text = `<div class="media_video_div"><video class="media_video" 
                preload="none" playsinline controls poster="${url}?format=${format}&name=small">
                <source src="${video}" type="${videoContentType}"></video></div>`;
                break;
            case 'animated_gif':
                text = `<div class="media_gif_div"><video class="media_gif" autoplay loop 
                muted preload="auto" playsinline poster="${media.media_url_https}" src="${media.video_info.variants[0].url}"
                type="${media.video_info.variants[0].content_type}" autoplay></video></div>`;
                break;
            default:
                break;
        }
    }
    return text;
}