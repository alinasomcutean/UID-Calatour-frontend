var counter = 1;
var userInfo = null;

$(document).ready(function() {
    $('#globalLogout').on("mouseover", 
        function () {
            $('#globalLogout').css("color", "red");
    });
    $('#globalLogout').on("mouseout", 
        function () {
            $('#globalLogout').css("color", "black");
    })
    $('#authenticate').on("click", verifyCredentials);
    $('#globalLogout').on("click", globalLogout);
    $('#sendMessage').on("click", sendMessage);
})

function showForm() {
    $('#header').show();
    $('#chat').animate({height: "300px", width: "300px"}, 500);
    $('#authIcon').removeClass().addClass("fas fa-lock").css("color", "white");
    $('#authMsg').html("<span>Authentication required !</span>").css("color", "white");
    $('#chatForm').show();
}

function hideForm() {
    $('#chatForm').hide();
    $('#preprocessing').hide();
}

function showChat() {
    $('#messageHeader').css("visibility", "visible");
    $('#chatBox').css("visibility", "visible");
    $('#messageBox').css("visibility", "visible");
}

function hideChat() {
    $('#messageHeader').css("visibility", "hidden");
    $('#chatBox').css("visibility", "hidden");
    $('#messageBox').css("visibility", "hidden");
}

function getCurrentDate(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var seconds = date.getSeconds();

    return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + seconds;
}

function verifyCredentials() {
    var usernameVal = $('#username').val();
    var passwordVal = $('#password').val();
    var data = {
        username: usernameVal,
        password: passwordVal
    }

    $.ajax({
        url: "https://cgisdev.utcluj.ro/moodle/chat-piu/authenticate.php", // https://www.example.com/api.php
        method: "POST", // POST, GET ...
        contentType: "application/json", // "json", "text"
        data: JSON.stringify(data),
        dataType: "json", // "json", "text"
        beforeSend: null,
        success: function(response) {
            console.log("Verify credentials success: ", response);
            userInfo = response;
            hideForm();
            $('#welcome').html("<span>Welcome <b>" + response.display + "</b></span>");
            showChat();
            readMessage();
            setInterval(readMessage, 3000);
        },
        error: function(xhr) {
            // default error message (could be the standard one)
            var message = "Generic error message.";
            if( xhr.responseText ) {
            // details received from server – use these
            // response expected as json
            message = $.parseJSON(xhr.responseText).message;
            }
            console.log("verify credentials error: ", message);
        },
        complete: function() {
            console.log("verify credentials complete");
        },
        statusCode: {
            403: function() {
                console.log("username and password are incorrect");
            }
        }
    })

    return false;
}

function globalLogout() {
    var data = {
        username: "alina",
        password: "alina0"
    }

    $.ajax({
        url: "https://cgisdev.utcluj.ro/moodle/chat-piu/logout.php", // https://www.example.com/api.php
        method: "DELETE", // POST, GET ...
        contentType: "application/json", // "json", "text"
        data: JSON.stringify(data),
        dataType: "json", // "json", "text"
        beforeSend: null,
        success: function(response) {
            console.log("global logout success: ", response);
            hideChat();
            showForm();
            $('#username').val("");
            $('#password').val("");
        },
        error: function(xhr) {
            // default error message (could be the standard one)
            var message = "Generic error message.";
            if( xhr.responseText ) {
            // details received from server – use these
            // response expected as json
            message = $.parseJSON(xhr.responseText).message;
            }
            console.log("global logout error: ", message);
        },
        complete: function() {
            console.log("global logout complete");
        },
        statusCode: {
            403: function() {
                console.log("username and password are incorrect");
            }
        }
    })
}

function sendMessage() {
    var messageVal = $('#message').val();
    var data = {
        message: messageVal
    }

    $.ajax({
        url: "https://cgisdev.utcluj.ro/moodle/chat-piu/sendmessage.php", // https://www.example.com/api.php
        method: "PUT", // POST, GET ...
        contentType: "application/json", // "json", "text"
        data: JSON.stringify(data),
        dataType: "json", // "json", "text"
        beforeSend: function ( xhr ) {
            xhr.setRequestHeader( 'Authorization', 'Bearer ' + userInfo.token);
        },
        success: function(response) {
            console.log("send message success: ", response);
            $('#chatBox').append("<span><b>" + userInfo.display + ":</b> " + data.message + "</span>");
            var date = new Date();
            $("<div>").addClass("date").append("<span>" + getCurrentDate(date) + "</span></div>").appendTo('#chatBox');
            $('#message').val("");
        },
        error: function(xhr) {
            // default error message (could be the standard one)
            var message = "Generic error message.";
            if( xhr.responseText ) {
                // details received from server – use these
                // response expected as json
                message = $.parseJSON(xhr.responseText).message;
            }
            console.log("send message error: ", message);
        },
        complete: function() {
            console.log("send message complete");
        },
        statusCode: {
            401: function() {
                console.log("you need to authenticate");
            }
        }
    })

    return false;
}

function readMessage() {
    $.ajax({
        url: "https://cgisdev.utcluj.ro/moodle/chat-piu/readmessages.php", // https://www.example.com/api.php
        method: "GET", // POST, GET ...
        contentType: "application/json", // "json", "text"
        data: null,
        dataType: "json", // "json", "text"
        beforeSend: function ( xhr ) {
            xhr.setRequestHeader( 'Authorization', 'Bearer ' + userInfo.token);
        },
        success: function(response) {
            console.log("read message success: ", response);
            var messages = response.messages;
            //alert(userInfo.display + " " + messages[0].sender);
            for(let m in messages) {
                if(userInfo.display !== messages[m].sender) {
                    $('#chatBox').append("<span><b>" + messages[m].sender + ":</b> " + messages[m].text + "</span>");
                    var date = new Date();
                    $("<div>").addClass("date").append("<span>" + getCurrentDate(date) + "</span></div>").appendTo('#chatBox');
                }
            }
        },
        error: function(xhr) {
            // default error message (could be the standard one)
            var message = "Generic error message.";
            if( xhr.responseText ) {
                // details received from server – use these
                // response expected as json
                message = $.parseJSON(xhr.responseText).message;
            }
            console.log("read message error: ", message);
        },
        complete: function() {
            console.log("read message complete");
        },
        statusCode: {
            401: function() {
                console.log("you need to authenticate");
            }
        }
    })

    return false;
}