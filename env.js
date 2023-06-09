// export const BASE_URL = 'http://172.22.66.82:3000/' // -> local
export const BASE_URL = 'https://hebbarskitchen.com/wp-json/wp/v2/' // -> local 2
export const GET_POST_URL = 'https://hebbarskitchen.com/ml-api/v2/post?post_id='

// export const BASE_URL = 'https://buybold.vmplay.ml/' // -> server

// names and conventions
export const COMPNAY_NAME = "HEBBARS KITCHEN"
export const APP_NAME = 'hebbars'

// trending page 
export const TRENDING_STRIDE = 520
export const HORI_HW_RAT = 0.5625
export const VERT_HW_RAT = 192 / 108

// export const TRENDING_STRIDE = 550

// color theme
export const COLOR1 = '#FFFFFF'
export const COLOR2 = 'black'
export const COLOR3 = 'grey'
export const COLOR4 = '#FF971D'
export const COLOR5 = '#BA2025'
export const COLOR_GREEN = '#3a6e6e'
export const LIGHT_GREY = 'lightgrey'


// admob configuration
export const ANDROID_BANNER_UNIT_ID = "ca-app-pub-5515597551541709\/9419287888"
export const ANDROID_INTER_UNIT_ID = "ca-app-pub-5515597551541709/2697697367"
export const IOS_BANNER_UNIT_ID = "ca-app-pub-5515597551541709\/1667686727"
export const IOS_INTER_UNIT_ID = "ca-app-pub-5515597551541709/7591200899"

// injectable code
export const jsInjectable = `// Add an event listener to all ons-list-item elements
    const listItems = document.getElementsByTagName('ons-list-item');
    Array.from(listItems).forEach((item) => {
      item.addEventListener('click', () => {
        // Get the data-ml-post-id attribute value
        const postId = item.getAttribute('data-ml-post-id');
        
        // Create a message object with the post ID
        const message = { postId };
        
        // Send the message back to the WebView
        window.ReactNativeWebView.postMessage(JSON.stringify(message));
      });
    });
    `


