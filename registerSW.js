if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/counter-strike-items/sw.js', { scope: '/counter-strike-items/' })})}