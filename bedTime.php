<?php

$data = json_decode(file_get_contents("php://input"), true);


if (!$data) {
  http_response_code(400);
  echo json_encode(['error' => 'Invalid data']);
  exit;
}

$hours = $data["hours"];
$minutes = $data["minutes"];

function calculateBedTime($cycle, $hours, $minutes){
  $removedHours = floor($cycle * 1.5);
  $removedMinutes = (($cycle * 1.5) - $removedHours) * 60;

  $calculatedHours = $hours - $removedHours;
  $calculatedMinutes = $minutes - $removedMinutes - 15;
  
  if ($calculatedHours < 0) {
    $calculatedHours = 24 + $calculatedHours;
  }

  if ($calculatedMinutes < 0) {
    $calculatedMinutes += 60;  // Wrap the minutes around.
    $calculatedHours -= 1;     // Decrease one hour.
  }


  return [
    'hours' => $calculatedHours,
    'minutes' => $calculatedMinutes
  ];
}

$results = [];
for ($cycle = 6; $cycle >= 1; $cycle--) {
  $time = calculateBedTime($cycle, $hours, $minutes);
  $formattedTime = sprintf("%02d:%02d", $time['hours'], $time['minutes']);
  $results["cycle $cycle"] = $formattedTime;
}

echo json_encode($results);


?>