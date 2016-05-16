<?php
	header("content-type:application/json;charset=utf8");

	$handle=$_REQUEST['handle'];
	$conn=mysqli_connect('127.0.0.1','root','root','lol','3306');
	$sql='SET NAMES utf8';
	mysqli_query($conn,$sql);
	$r='';
	if($handle==='login'){  //登录
		$uname=$_REQUEST['uname'];
		$upwd=$_REQUEST['upwd'];
		$sql="SELECT * FROM member where userName='$uname'";
		$result=mysqli_fetch_assoc(mysqli_query($conn,$sql));
		if($result){
			if($result['userPwd']===$upwd){
				$r.='true';
			}else{
				$r.='密码输入错误';
			}
		}else{
			$r.='该用户名不存在';
		}
	}else if($handle==='register'){  //注册
		$uname=$_REQUEST['userName'];
		$upwd=$_REQUEST['userPwd'];
		$ucode=$_REQUEST['userCode'];
		$uphone=$_REQUEST['userPhone'];
		$sql="SELECT MAX(`userId`) FROM member";
		$index=mysqli_fetch_assoc(mysqli_query($conn,$sql));
		$index=$index['MAX(`userId`)']+1;

		$sql="insert into member values('$index','$uname','$upwd','$ucode','$uphone')";
		$result=mysqli_query($conn,$sql);
		if($result){
			$r.='true';
		}else{
			$r.='false';
		}
	}else if($handle==='updateCode'){
		$uname=$_REQUEST['uname'];
		$userCode=$_REQUEST['userCode'];
		$sql="SELECT * FROM member WHERE userName='$uname'";
		$result=mysqli_fetch_assoc(mysqli_query($conn,$sql));
		if($userCode&&$result['userCode']===$userCode){
			$r.='true';
		}else{
			$r.='false';
		}
	}else if($handle==='updatePhone'){
		$uname=$_REQUEST['uname'];
		$userPhone=$_REQUEST['userPhone'];
		$sql="SELECT * FROM member WHERE userName='$uname'";
		$result=mysqli_fetch_assoc(mysqli_query($conn,$sql));
		if($userPhone&&$result['userPhone']===$userPhone){
			$r.='true';
		}else{
			$r.='false';
		}
	}else if($handle==='updatePwd'){
		$pwd=$_REQUEST['pwd'];
		$uname=$_REQUEST['uname'];
		$sql="UPDATE member set userPwd='$pwd' WHERE userName='$uname'";
		$result=mysqli_query($conn,$sql);
		if($result){
			$r.='true';
		}else{
			$r.='false';
		}
	}else if($handle==='addHero'){
		$heroName=$_REQUEST['heroName'];
		$alias=$_REQUEST['alias'];
		$position=$_REQUEST['position'];
		switch ($position) {
			case 0:
				$position='法师';
				break;
			case 1:
				$position='打野';
				break;
			case 2:
				$position='射手';
				break;
			case 3:
				$position='上单';
				break;			
			case 4:
				$position='辅助';
			break;
		}
		$equip=$_REQUEST['equip'];
		$skills=$_REQUEST['skills'];
		$story=$_REQUEST['story'];
		$sql="SELECT MAX(`id`) FROM herotb";
		$index=mysqli_fetch_assoc(mysqli_query($conn,$sql));
		$index=$index['MAX(`id`)']+1;
		$sql="insert into herotb values('$index','$heroName','$alias','$position','$equip','$skills','$story')";
		$result=mysqli_query($conn,$sql);
		if($result){
			$r.='true';
		}else{
			$r.='false';
		}
	}
	echo $r;
?>