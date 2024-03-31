const toastLiveExample = document.getElementById('liveToast');
const toastBody = toastLiveExample.querySelector('.toast-body');
const toastHeader = document.querySelector('.toast-header');
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);

function onToast(message,bg) {
    let bg_all = 'bg-'+bg;
    toastHeader.classList.remove('bg-success')
    toastHeader.classList.remove('bg-danger')
    toastHeader.classList.remove('bg-warning')
    toastHeader.classList.add(bg_all)
    toastBody.innerText = message;
    toastBootstrap.show();
}