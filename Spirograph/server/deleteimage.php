<?php
$imgur_id = $_POST["imgur_id"];

if ($imgur_id) {
  $mysqli = new mysqli("mysql", "inspirographer", "inspiropass", "inspirograph");

  if ($mysqli->connect_errno) {
    http_response_code(500);
    printf("Connect failed: %s\n", $mysqli->connect_error);
    exit();
  }

  $query = $mysqli->prepare("DELETE FROM image WHERE imgur_id LIKE ?");
  
  if (!$query) {
    http_response_code(500);
    printf("Prepare failed: %s\n", $mysqli->error);
    exit();
  }
  
  $query->bind_param("s", $imgur_id);
  
  if ($query->execute()) {
    http_response_code(200);
    printf("Successfully deleted image '" . $imgur_id . "'");
  } else {
    http_response_code(500);
    printf("Unable to delete image '" . $imgur_id . "': ", $mysqli->error);
  }

  $mysqli->close();
}

?>
