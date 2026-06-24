<?php
$t1 = microtime(true);
try {
    $pdo = new PDO('mysql:host=mysql;dbname=campus_eventhub_notifications', 'root', 'root');
    $stmt = $pdo->query('SELECT * FROM notifications LIMIT 1');
    $res = $stmt->fetchAll();
    echo "Database connection and query took: " . (microtime(true) - $t1) . " seconds\n";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . " (took " . (microtime(true) - $t1) . " seconds)\n";
}
