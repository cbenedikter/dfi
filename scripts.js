// Show the login pop-up
function showPopup() {
    document.getElementById('popup').style.display = 'block';
}

// Hide the login pop-up and call OneSignal login method
function hidePopup() {
    // Get the external_id value (the text entered in the input field)
    var externalId = document.querySelector('.popup input').value;

    // Call the OneSignal login method with external_id
    if (window.OneSignal) {
        window.OneSignal.push(function() {
            OneSignal.login({ external_id: externalId });
        });
    }

    // Hide the pop-up after login
    document.getElementById('popup').style.display = 'none';
}
