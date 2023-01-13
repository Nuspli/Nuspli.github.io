const retry = document.querySelector('.retry_button');

retry.addEventListener('click', function() {
    if (confirm("are you sure you want to restart the game?")) {
        window.location.reload()
        return
        }
});