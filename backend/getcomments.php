<?php

// CORS (já no padrão profissional)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// responde preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

header("Content-Type: application/json");

require(__DIR__ . "/conexao.php");

$post_id = $_GET['post_id'] ?? null;

if (!$post_id) {
  echo json_encode([]);
  exit;
}

$sql = "SELECT * FROM comments WHERE post_id = ? ORDER BY id DESC";
$stmt = $pdo->prepare($sql);
$stmt->execute([$post_id]);

$comments = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($comments);