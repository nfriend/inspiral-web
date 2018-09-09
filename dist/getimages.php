<?php
$page = isset($_REQUEST["page"]) ? $_REQUEST["page"] : null;
$perPage = isset($_REQUEST["perPage"]) ? $_REQUEST["perPage"] : null;

$mysqli = new mysqli("mysql", "inspirographer", "inspiropass", "inspirograph");

if ($mysqli->connect_errno) {
  http_response_code(500);
  printf("Connect failed: %s\n", $mysqli->connect_error);
  exit();
}

if ($page != null && $perPage != null) {
  $query = $mysqli->prepare("SELECT imgur_id, title, link FROM image ORDER BY datetime DESC LIMIT ? OFFSET ?");
} else {
  $query = $mysqli->prepare("SELECT imgur_id, title, link FROM image ORDER BY datetime DESC");
}
  
if (!$query) {
  http_response_code(500);
  printf("Prepare failed: %s\n", $mysqli->error);
  exit();
}

if ($page != null && $perPage != null) {

  $offset = $page * $perPage;
  $query->bind_param("ii", $perPage, $offset);
}
  
if ($result = $query->execute()) {
  $allRows = array();
  $result = $query->get_result();
  
  // note: if this is failing, you probably need to install php5-mysqlnd (a drop-in replacement for php5-mysql) 
  // AND enable it in your php.ini - add this to the bottom of your php.ini file:
  // extension=mysqlnd.so
  while($row = $result->fetch_assoc()) {
    $allRows[] = $row;
  }
  
  $countQuery = $mysqli->query("SELECT COUNT(*) FROM image");
  $countQueryResult = $countQuery->fetch_row();
  $imageCount = $countQueryResult[0];
  
  $returnData = array(
    "images" => $allRows,
    "imageCount" => $imageCount
  );

  http_response_code(200);
  printf(json_encode($returnData));
  
} else {
  http_response_code(500);
  printf("Unable to execute SELECT query: ", $mysqli->error);
}

$mysqli->close();

?>
