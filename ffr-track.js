let loc = window.location.pathname;
let ochnkey = ''
let crmDomain = ''
if (window.location.origin.includes('staging') || window.location.origin.includes("localhost")) {
    ochnkey = 'sw1cs4S4SCdL8fN85dC5PuDU';
    crmDomain = "http://localhost:3000"
} else {
     ochnkey = 'sw1cs4S4SCdL8fN85dC5PuDU';
    crmDomain = "http://localhost:3000"
}
function getCookie(cookieName) {
    const cookies = document.cookie.split(';');
    for (let index = 0; index < cookies.length; index++) {
        const cookie = cookies[index].trim();
        // Check if this cookie starts with the desired name
        if (cookie.startsWith(`${cookieName}=`)) {
            return cookie.substring(cookieName.length + 1);
        }
    }
    return null;
}
(function (d, s, id) {
    let js, ojs = d.getElementsByTagName(s)[0];

    if (d.getElementById(id)) { return; }

    js = d.createElement(s); js.id = id; js.async = !0;

    js.src = crmDomain + "/jsapi/omnichannel.js";
    let consentCookie = getCookie('cookie_consent');
    let cookieAccepted = false
    if(consentCookie === 'declined'){ 
      console.log('declined')
    }
    else if(consentCookie === 'accepted'){
      cookieAccepted = true
    }
    else{
      consentCookie = consentCookie ? JSON.parse(consentCookie) : null;
      cookieAccepted = consentCookie?.analytics
    }
    // if (cookieAccepted) {
        ojs.parentNode.insertBefore(js, ojs);
    // }    

}(document, 'script', 'omnichanneltrack'));

function ochntrack() { //initialization function
    let consentCookie = getCookie('cookie_consent');
    let cookieAccepted = false
    if(consentCookie === 'declined'){ 
        console.log('declined')
    }
    else if(consentCookie === 'accepted'){
      cookieAccepted = true
    }
    else{
      consentCookie = consentCookie ? JSON.parse(consentCookie) : null;
      cookieAccepted = consentCookie?.marketing
    }
    if (cookieAccepted) {
        if (ochn && ochn.init) ochn.init();
        if (ochn && ochn.send) ochn.send("action", "visit");
    }
}
window.onclick = () => {
    if (window.location.pathname != loc) {
        loc = window.location.pathname;
        let consentCookie = getCookie('cookie_consent');
        let cookieAccepted = false;
        if(consentCookie === 'declined'){ 
          console.log('declined')
        } else if(consentCookie === 'accepted'){
          cookieAccepted = true
        } else{
          consentCookie = consentCookie ? JSON.parse(consentCookie) : null;
          cookieAccepted = consentCookie?.analytics
        }
        if (cookieAccepted) {
          if (ochn && ochn.send) ochn.send("action", "visit")
        }
    }
}