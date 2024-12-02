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
// Show the Sign Up pop-up
function showSignUpPopup() {
    document.getElementById('signUpPopup').style.display = 'block';
}

// Handle the Next button click in the Sign Up pop-up
function nextStep() {
    // Get the verification code entered
    var verificationCode = document.querySelector('#signUpPopup input').value.trim();

    // Capture the time when the "Next" button is clicked as a UNIX timestamp
    var currentTime = new Date().getTime(); // UNIX timestamp in milliseconds

    if (verificationCode) {
        console.log("Verification code entered: " + verificationCode);

        // Send tags to OneSignal
        if (window.OneSignal) {
            window.OneSignal.push(function() {
                OneSignal.User.addTags({
                    invitationCode: verificationCode, // The code entered
                    invitationTime: currentTime        // The UNIX timestamp of the click
                });
            });
        }
    } else {
        console.error("Verification code is empty.");
    }

    // Hide the pop-up after the action
    document.getElementById('signUpPopup').style.display = 'none';
}

// Close pop-up if clicked outside of the pop-up
window.addEventListener('click', function(event) {
    var loginPopup = document.getElementById('popup');
    var signUpPopup = document.getElementById('signUpPopup');

    if (event.target === loginPopup || event.target === signUpPopup) {
        return; // Prevent closing if the click is inside the pop-up
    }

    // Close the pop-ups if click is outside
    loginPopup.style.display = 'none';
    signUpPopup.style.display = 'none';
});

