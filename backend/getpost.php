<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// importa conexão com banco
require(__DIR__ . "/conexao.php");

$id = $_GET['id'] ?? null;

if (!$id) {
  echo json_encode(["error" => "ID não fornecido"]);
  exit;
}

$sql = "SELECT * FROM posts WHERE id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$id]);

$post = $stmt->fetch(PDO::FETCH_ASSOC);

if ($post) {
  echo json_encode($post);
} else {
  echo json_encode(null);
}