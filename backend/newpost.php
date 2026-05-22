<?php

// 🔓 libera acesso do frontend (CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

// 🔥 necessário para requisições preflight (CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit();
}

// importa conexão com banco
require_once "conexao.php";

// pega dados enviados pelo React (FormData)
$title = $_POST['title'] ?? null;
$body = $_POST['body'] ?? null;

// pega o arquivo enviado
$image = $_FILES['image'] ?? null;

// validação simples
if (!$title || !$body) {
    echo json_encode([
        "success" => false,
        "message" => "Preencha todos os campos"
    ]);
    exit();
}

// variável que vai guardar o nome da imagem
$imageName = null;

// 🔥 SE existir imagem, faz upload
if ($image && $image['tmp_name']) {

    // caminho absoluto da pasta uploads
    $uploadDir = __DIR__ . "/uploads/";

    // cria a pasta se não existir
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    // cria nome único para evitar conflito
    $imageName = uniqid() . "_" . basename($image['name']);

    // caminho final do arquivo
    $targetPath = $uploadDir . $imageName;

    // move arquivo temporário para a pasta uploads
    if (!move_uploaded_file($image['tmp_name'], $targetPath)) {
        echo json_encode([
            "success" => false,
            "message" => "Erro ao salvar imagem"
        ]);
        exit();
    }
}

// prepara o INSERT no banco
$sql = $pdo->prepare("
    INSERT INTO posts (title, body, image)
    VALUES (?, ?, ?)
");

// executa passando os valores
$sql->execute([
    $title,
    $body,
    $imageName // pode ser null se não tiver imagem
]);

// resposta para o frontend
echo json_encode([
    "success" => true,
    "message" => "Post criado com sucesso"
]);