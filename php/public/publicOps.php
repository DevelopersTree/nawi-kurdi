<?php
if (isset($_POST['OP'])) {
include '../gigant_config.php';

$OP = $_POST['OP'];

switch ($OP) {


	case 'NEW_NAME':
		$name = $_POST['Name'];
		$desc = $_POST['NameDesc'];
		$gender = $_POST['gender'];

		$query = $db->prepare("INSERT INTO names (name,`desc`,gender,sended,Activated) 
							   VALUES (:name,:desc,:gender,1,0)");
		
		if($query->execute([
				"name"=>$name,
				"desc"=>$desc,
				"gender"=>$gender
			]) ){
			 echo json_encode(["status"=>1,"msg"=>"ناوەکەت نێردرا سوپاس بۆ بەشداریکردنت"]); 
		}else{ 
			echo json_encode(["status"=>0,"msg"=>"ھەڵەیەک رویدا لەکاتی ناردن"]);
		}
	break;
	

	case 'GET_NAMES':
		$namesPerPage = 8;

		$startingIndex = 0;
		$limit = " LIMIT 0,16";
		if(isset($_POST['Index']) && is_numeric($_POST['Index'])){
			$startingIndex = intval($_POST['Index']);
			$offset = $startingIndex+$namesPerPage;
			$limit = " LIMIT $startingIndex,$offset ";
		}

		$gender = " ";
		if(isset($_POST['gender']) && ($_POST['gender']=='M'|$_POST['gender']=='F') ){
			if($_POST['gender']=='M'){
				$gender = "gender='M' AND";
			}else{
				$gender = "gender='F' AND";
			}
		}
		$alphabet = [
			"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q",
			"r","s","t","u","v","w","x","y","z"
		];
		$startWith = " ";
		if(isset($_POST['startwith']) && in_array($_POST['startwith'], $alphabet) ){
			$startWith = "name Like '".$_POST['startwith']."%' AND";
		}

		$orderBy = " ORDER BY RAND()  ";
		if(isset($_POST['order']) && ($_POST['order']=='ASC'|$_POST['order']=='DESC') ){
			$orderBy = "ORDER BY nameId ".$_POST['order'];
		}

		$query = $db->query("SELECT * FROM names WHERE $gender  $startWith  Activated='1' AND Deleted='0' $orderBy $limit");
		echo json_encode($query->fetchAll(PDO::FETCH_OBJ));		
	break;
	case 'SEARCH_NAMES':
		$searchData = $_POST['query'];
		$searchData = "%$searchData%";
		$query = $db->prepare("SELECT * FROM names WHERE name Like :query AND  Activated='1' AND Deleted='0' ORDER BY RAND() Limit 16");
		$query->execute(["query"=> $searchData]);
		echo json_encode($query->fetchAll(PDO::FETCH_OBJ));		
	break;
	case 'GET_NAME_COUNT':

		$query = $db->query("SELECT COUNT(*) AS total FROM names WHERE Deleted='0' ");
		$data = $query->fetch(PDO::FETCH_OBJ);
		echo json_encode($data);		
	break;
	
}

}// end  of the if
?>