const audiobtn = document.getElementById('audio__button')
const audio = document.getElementById('audio')

audio.volume = 0.1

audiobtn.addEventListener('click', function() {
    if (audiobtn.innerHTML == "pause"){
        audiobtn.innerHTML = "play"
        audio.pause()
    }
    else {audiobtn.innerHTML = "pause"; audio.play()}
});