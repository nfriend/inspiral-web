<?php
$imgur_id = isset($_POST["imgur_id"]) ? $_POST["imgur_id"] : null;
$title = isset($_POST["title"]) ? $_POST["title"] : null;
$description = isset($_POST["description"]) ? $_POST["description"] : null;
$datetime = isset($_POST["datetime"]) ? $_POST["datetime"] : null;
$type = isset($_POST["type"]) ? $_POST["type"] : null;
$animated = isset($_POST["animated"]) ? $_POST["animated"] : null;
$width = isset($_POST["width"]) ? $_POST["width"] : null;
$height = isset($_POST["height"]) ? $_POST["height"] : null;
$size = isset($_POST["size"]) ? $_POST["size"] : null;
$views = isset($_POST["views"]) ? $_POST["views"] : null;
$bandwidth = isset($_POST["bandwidth"]) ? $_POST["bandwidth"] : null;
$deletehash = isset($_POST["deletehash"]) ? $_POST["deletehash"] : null;
$name = isset($_POST["name"]) ? $_POST["name"] : null;
$section = isset($_POST["section"]) ? $_POST["section"] : null;
$link = isset($_POST["link"]) ? $_POST["link"] : null;
$gifv = isset($_POST["gifv"]) ? $_POST["gifv"] : null;
$mp4 = isset($_POST["mp4"]) ? $_POST["mp4"] : null;
$webm = isset($_POST["webm"]) ? $_POST["webm"] : null;
$looping = isset($_POST["looping"]) ? $_POST["looping"] : null;
$favorite = isset($_POST["favorite"]) ? $_POST["favorite"] : null;
$nsfw = isset($_POST["nsfw"]) ? $_POST["nsfw"] : null;
$vote = isset($_POST["vote"]) ? $_POST["vote"] : null;
$account_url = isset($_POST["account_url"]) ? $_POST["account_url"] : null;

if ($animated === "true") {
  $animated = 1;
}
if ($looping === "true") {
  $looping = 1;
}
if ($favorite === "true") {
  $favorite = 1;
}
if ($nsfw === "true") {
  $nsfw = 1;
}

if ($imgur_id && $link && $datetime) {
  $mysqli = new mysqli("localhost", "inspirographer", "", "inspirograph");

  if ($mysqli->connect_errno) {
    http_response_code(500);
    printf("Connect failed: %s\n", $mysqli->connect_error);
    exit();
  }

  $query = $mysqli->prepare("INSERT INTO image (imgur_id, title, description, datetime, type, animated, width, height, size, views, bandwidth, deletehash, name, section, link, gifv, mp4, webm, looping, favorite, nsfw, vote, account_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
  
  if (!$query) {
    http_response_code(500);
    printf("Prepare failed: %s\n", $mysqli->error);
    exit();
  }
  
  // i hate PHP.
  $query->bind_param("sssssiiiiiisssssssiiiss", $imgur_id, $title, $description, $datetime, $type, $animated, $width, $height, $size, $views, $bandwidth, $deletehash, $name, $section, $link, $gifv, $mp4, $webm, $looping, $favorite, $nsfw, $vote, $account_url);
  
  if ($query->execute()) {
    http_response_code(200);
    printf("Successfully inserted image '" . $imgur_id . "'");
  } else {
    http_response_code(500);
    printf("Failed to insert image '" . $imgur_id . "': ", $mysqli->error);
  }

  $mysqli->close();
} else {
  http_response_code(400);
  printf("Bad Request - some required parameters were missing.");
}

?>
