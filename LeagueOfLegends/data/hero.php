<?php
	header('content-type:application/json;charset=utf-8');
	$conn=mysqli_connect('127.0.0.1','root','root','lol','3306');
	$sql='SET NAMES utf8';
	mysqli_query($conn,$sql);
	$tp=$_REQUEST['param'];
	$ret=array();
	switch ($tp) {
		case 0:
		$position="'法师','射手','上单','打野','辅助'";
			break;
		case 1:
		$position="'射手'";
			break;
		case 2:
		$position="'法师'";
			break;
		case 3:
		$position="'上单'";
			break;
		case 4:
		$position="'打野'";
			break;
		case 5:
		$position="'辅助'";
			break;
		default:
		$position='';
		break;
	}
	$sql="SELECT * FROM herotb WHERE `position` in($position)";
	$result=mysqli_query($conn,$sql);
	while(true){
		$r=mysqli_fetch_assoc($result);
		if($r==null){
			break;
		}
		$ret[]=$r;
	}
	echo json_encode($ret);
?>