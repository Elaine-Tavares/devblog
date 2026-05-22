<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$id = $_POST['id'] ?? null;
$title = $_POST['title'] ?? "";
$body = $_POST['body'] ?? "";

if (!$id) {
  echo json_encode(["error" => "ID não enviado"]);
  exit;
}

// verifica se veio imagem
if (isset($_FILES['image'])) {

  $image = $_FILES['image'];

  $imageName = uniqid() . "_" . $image['name'];
  $path = __DIR__ . "/uploads/" . $imageName;

  move_uploaded_file($image['tmp_name'], $path);

  // atualiza com imagem
  $sql = "UPDATE posts SET title = ?, body = ?, image = ? WHERE id = ?";
  $stmt = $pdo->prepare($sql);
  $stmt->execute([$title, $body, $imageName, $id]);

} else {

  // atualiza sem mexer na imagem
  $sql = "UPDATE posts SET title = ?, body = ? WHERE id = ?";
  $stmt = $pdo->prepare($sql);
  $stmt->execute([$title, $body, $id]);
}

echo json_encode(["success" => true]);