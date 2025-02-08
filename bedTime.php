<?php

$data = json_decode(file_get_contents("php://input"), true);


if (!$data) {
  http_response_code(400);
  echo json_encode(['error' => 'Invalid data']);
  exit;
}

$hours = $data["hours"];
$minutes = $data["minutes"];

function calculateTime($cycle, $hours, $minutes){
  $addedHours = floor($cycle * 1.5);
  $addedMinutes = (($cycle * 1.5) - $addedHours) * 60;

  $calculatedHours = $hours + $addedHours;
  $calculatedMinutes = $minutes + $addedMinutes + 15;

  if ($calculatedMinutes > 59) {
    $extraHours = floor($calculatedMinutes / 60);
    $calculatedMinutes = $calculatedMinutes % 60;
    $calculatedHours += $extraHours;
  }

  if ($calculatedHours > 23) {
    $calculatedHours = $calculatedHours % 24;
  }

  return [
    'hours' => $calculatedHours,
    'minutes' => $calculatedMinutes
  ];
}

$results = [];
for ($cycle = 1; $cycle <= 6; $cycle++) {
  $time = calculateTime($cycle, $hours, $minutes);
  $formattedTime = sprintf("%02d:%02d", $time['hours'], $time['minutes']);
  $results["cycle $cycle"] = $formattedTime;
}

echo json_encode($results);


?>