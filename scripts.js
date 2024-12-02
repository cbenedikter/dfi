// Show the login pop-up
function showPopup() {
    document.getElementById('popup').style.display = 'block';
}

// Hide the login pop-up and call OneSignal login method
function hidePopup() {
    // Get the value from the input field (ensure it's a string)
    var externalId = document.querySelector('.popup input').value.trim();

    // Check if externalId is not empty before calling OneSignal.login
    if (externalId) {
        if (window.OneSignal) {
            window.OneSignalDeferred.push(async function(OneSignal) {
                await OneSignal.login(externalId); // Pass the externalId directly
            });
        }
    } else {
        console.error("External ID is empty.");
    }

    // Hide the pop-up after login attempt
    document.getElementById('popup').style.display = 'none';
}
