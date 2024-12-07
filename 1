<?php
$host = getenv('DB_HOST');
$db = getenv('DB_NAME');
$user = getenv('DB_USER');
$pass = getenv('DB_PASS');

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(\"Connection failed: \" . $conn->connect_error);
}

$sql = \"CREATE DATABASE IF NOT EXISTS $db\";
if ($conn->query($sql) !== TRUE) {
    echo \"Error creating database: \" . $conn->error . \"\n\";
}

$conn->select_db($db);


$stmt = $conn->prepare(\"SELECT * FROM events\");
$stmt->execute();
$result = $stmt->get_result();
$events = $result->fetch_all(MYSQLI_ASSOC);
$stmt->close();


    <div class=\"event-grid\">
        <?php foreach ($events as $event): ?>
            <div class=\"event-card\">
                <h4><?php echo htmlspecialchars($event['title']); ?></h4>
                <p><strong>Date:</strong> <?php echo htmlspecialchars($event['event_date']); ?></p>
                <p><strong>Location:</strong> <?php echo htmlspecialchars($event['location']); ?></p>
                <div class=\"event-actions\">
                    <form method=\"POST\" style=\"display:inline;\" onsubmit=\"return confirm('Are you sure you want to delete this event?');\">
                        <input type=\"hidden\" name=\"event_id\" value=\"<?php echo $event['id']; ?>\">
                        <button type=\"submit\" name=\"delete\" class=\"event-button\">Delete</button>
                    </form>
                    <button onclick=\"editEvent(<?php echo $event['id']; ?>, '<?php echo htmlspecialchars($event['title']); ?>', '<?php echo htmlspecialchars($event['description']); ?>', '<?php echo htmlspecialchars($event['event_date']); ?>', '<?php echo htmlspecialchars($event['location']); ?>')\" class=\"event-button\">Edit</button>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
?>
