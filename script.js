var playing = false;
var score;
var trialsleft;
var step;
var action;
var fruits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
var timer;
var startTime;
var elapsedTime = 0;  // Time in seconds

$(function () {
  // Click on start or reset button
  $("#front").show();
  $("#startReset").click(function () {
    if (playing == true) {
      // If we are playing
      location.reload(); // Reload page
    } else {
      // If we are not playing from before
      $("#front").hide();
      $("#score").show();
      $("#timerDisplay").show(); // Show timer display
      playing = true;

      // Set score to 0
      score = 0;
      $("#scoreValue").html(score);

      // Show trials left box
      $("#trialsleft").show();
      trialsleft = 3;
      addhearts();

      // Start timer
      startTime = new Date().getTime();  // Capture the start time
      $("#timerValue").html("00:00:00"); // Initialize timer display
      startTimer();

      // Hide game over box
      $("#gameOver").hide();

      // Change button to reset game
      $("#startReset").html("Reset Game");

      // Start action
      startAction();
    }
  });

  // Slice a fruit
  $("#fruit1").mouseover(function () {
    score++; // Increase score
    $("#scoreValue").html(score);

    // Play random slice sound
    playSliceSound();

    // Stop fruit
    clearInterval(action);

    // Hide fruit
    $("#fruit1").hide("explode", 500); // Slice fruit

    // Send new fruit
    setTimeout(startAction, 500);
  });

  // Functions

  // Add hearts
  function addhearts() {
    $("#trialsleft").empty();
    for (i = 0; i < trialsleft; i++) {
      $("#trialsleft").append('<img src="images/heart.png" class="life">');
    }
  }

  // Start action
  function startAction() {
    // Generate random fruit
    $("#fruit1").show();

    // Choose random fruit
    chooseRandom();

    // Random position
    $("#fruit1").css({
      left: Math.round(550 * Math.random()),
      top: -50,
    });

    // Generate random step (time to fall adjusted here)
    step = 1 + Math.round(3 * Math.random()); // Adjust the time to fall by changing step value

    // Descend fruits down by 10ms
    action = setInterval(function () {
      // Move fruit by one step
      $("#fruit1").css("top", $("#fruit1").position().top + step);

      // Check if the fruit is too low
      if ($("#fruit1").position().top > $("#fruitcontainer").height() - 50) {
        // Yes it is low
        // Check trials left
        if (trialsleft > 1) {
          // Generate a fruit
          $("#fruit1").show();
          // Choose random fruit
          chooseRandom();
          // Random position
          $("#fruit1").css({
            left: Math.round(550 * Math.random()),
            top: -50,
          });
          // Generate random step
          step = 1 + Math.round(3 * Math.random()); // Adjust the time to fall by changing step value

          // Reduce trials by one
          trialsleft--;
          // Populate trials left box by one
          addhearts();
        } else {
          // Game over
          playing = false; // We are not playing anymore
          $("#score").hide();
          $("#startreset").html("Start Game");
          $("#gameOver").show();
          $("#gameOver").html(
            "<p>Game Over!</p><p>Your score is " + score + "</p><p>Time: " + formatTime(elapsedTime) + "</p>"
          );
          $("#trialsleft").hide();
          stopAction(); // Stops action
        }
      }
    }, 10);
  }

  // Choose random fruits
  function chooseRandom() {
    $("#fruit1").attr(
      "src",
      "images/fruits/" + fruits[Math.floor(Math.random() * fruits.length)] + ".png"
    );
  }

  // Stop action
  function stopAction() {
    clearInterval(action);
    $("#fruit1").hide();
  }

  // Start timer
  function startTimer() {
    timer = setInterval(function () {
      elapsedTime = Math.floor((new Date().getTime() - startTime) / 1000); // Get elapsed time in seconds
      $("#timerValue").html(formatTime(elapsedTime)); // Update timer display
    }, 1000);
  }

  // Format time as HH:MM:SS
  function formatTime(seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var remainingSeconds = seconds % 60;
    return (
      String(hours).padStart(2, "0") +
      ":" +
      String(minutes).padStart(2, "0") +
      ":" +
      String(remainingSeconds).padStart(2, "0")
    );
  }

  // Play slice sound
  function playSliceSound() {
    var randomSound = Math.floor(Math.random() * 3) + 1;
    $("#slicesound")[0].src = "sounds/slice-sound-" + randomSound + ".mp3";
    $("#slicesound")[0].play();
  }

  // Menu Button Click
  $("#menu").click(function () {
    $("#menuItems").toggle();
  });

  // Adjust Background Music Volume
  $("#bgMusicVolume").on("input", function () {
    var volume = $(this).val();
    $("#backgroundMusic")[0].volume = volume;
  });

  // Adjust Fruit Slice Sound Volume
  $("#fruitSoundVolume").on("input", function () {
    var volume = $(this).val();
    $("#slicesound")[0].volume = volume;
  });
});
