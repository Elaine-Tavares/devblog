<?php

// libera acesso
header("Access-Control-Allow-Origin: *");

// conecta no banco
require_once "conexao.php";

// busca posts mais recentes primeiro
$sql = $pdo->query("SELECT * FROM posts ORDER BY id DESC");

// transforma em array
$posts = $sql->fetchAll(PDO::FETCH_ASSOC);

// retorna JSON
echo json_encode($posts);