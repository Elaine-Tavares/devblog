<?php
// dados do banco
$host = "srv1548.hstgr.io";
$db = "u276614526_devblog";
$user = "u276614526_elainedevblog";
$pass = "Front2025@";

// cria conexão com PDO (forma segura)
try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);

    // define modo de erro (pra facilitar debug)
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {
    // se der erro na conexão, mostra mensagem
    echo "Erro na conexão: " . $e->getMessage();
}