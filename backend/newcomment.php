<?php

// 🔥 CORS COMPLETO
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// 🔥 RESPONDE O PREFLIGHT
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

header("Content-Type: application/json");

require(__DIR__ . "/conexao.php");

// pega JSON do body
$data = json_decode(file_get_contents("php://input"), true);

$post_id = $data['post_id'] ?? null;
$author = $data['author'] ?? "";
$content = $data['content'] ?? "";

if (!$post_id || !$author || !$content) {
  echo json_encode(["error" => "Dados incompletos"]);
  exit;
}

$sql = "INSERT INTO comments (post_id, author, content) VALUES (?, ?, ?)";
$stmt = $pdo->prepare($sql);
$stmt->execute([$post_id, $author, $content]);

echo json_encode(["success" => true]);