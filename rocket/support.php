
<?php
    require 'dbconfig.php';
    
    
    if(isset($_GET["points"])){
        
        $scores = json_decode($_GET["points"], true);
        
        print($_GET["points"]."\n");
        $keys = array_keys($scores);
        
        $sql="INSERT INTO camelrace (username, points) VALUES (?, ?);";
        
        foreach($keys as &$key) {
            print($key." - ");
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('si', $key, $scores[$key]);
            $stmt->execute();
        }
        
        $conn->close();
        
        print("Points saved");
    }
    elseif($_GET["userpoints"]){
        
        header('Content-type: application/json');

        $sql = "SELECT username, sum(points) AS pointtotal FROM camelrace GROUP BY username;";

        $result = $conn->query($sql);
        $userpoints = [];

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $userpoints[$row["username"]] = $row["pointtotal"];
            }
        }

        $arr = $userpoints;
        echo json_encode($arr);
    }
?>