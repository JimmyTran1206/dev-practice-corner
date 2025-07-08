var $openModelBtn = document.querySelector('.open-modal');
var $dismissModalBtn = document.querySelector('.dismiss-modal');
var $dialog = document.querySelector('dialog');
if (!$dialog || !$dismissModalBtn || !$openModelBtn)
    throw new Error('Error. Unable to query elements');
$openModelBtn.addEventListener('click', function () {
    $dialog.showModal();
});
$dismissModalBtn.addEventListener('click', function () {
    $dialog.close();
});
