$(document).ready(function () {

    //Hide elements at the begging
    $('#chatForm').hide();
    $('#preprocessing').hide();
    $('#headerMsg').hide();
    $('#closeChat').hide();
    $('#correct').hide();
    $('#chat').animate({height: "40px", width: "40px"}, 500);

    //Open the chat
    $('#openChat').click(function() {
        $('#headerMsg').show();
        $('#closeChat').show();
        $('#chat').animate({height: "300px", width: "300px"}, 500);
        $('#chatForm').show();
    })

    //Close the chat
    $('#closeChat').click(function () {
        $('#chat').animate({height: "40px", width: "40px"}, 500);
        $('#chatForm').hide();
        $('#preprocessing').hide();
        $('#headerMsg').hide();
        $('#closeChat').hide();
    })

    //Authentication
    $('#authenticate').click(function () {
        //$('#chat chatForm').submit();
        $('#username').prop("disabled", true);
        $('#password').prop("disabled", true);

        $('#preprocessing').show().delay(3000).fadeIn( function () {
            $('#username').prop("disabled", false);
            $('#password').prop("disabled", false);

            verifyCredentialss();
            $('#chatForm').hide();
            $('#preprocessing').hide();
        });

        return false;
    })
})

function verifyCredentialss () {
    var username = $('#username').val();
    var password = $('#password').val();

    if(username == "alina" && password == "alina0"){
        $('#authIcon').removeClass().addClass("fa fa-check").css("color", "white");
        $('#authMsg').html("<span>Authentication successful !</span>").css("color", "white");
    } else {
        $('#authIcon').removeClass().addClass("fas fa-exclamation-triangle").css("color", "darkred");
        $('#authMsg').html("<span>Invalid username or password</span>").css("color", "darkred");
    }
}