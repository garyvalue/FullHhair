
<?php

	//$name=$_GET["name"];//接收参数

	$hostname_conn = "w.rdc.sae.sina.com.cn";//数据库主库&从库地址

	$database_conn = "app_15124192655";//建数据库名

	$username_conn = "ll0w0koxxk";//数据库用户名

	$password_conn = "1y4wzi2lx55y2yyjkw12003040ziy4344h0lz2hz";//数据库密码

	//连接MYSQL数据库

	$conn = mysqli_connect($hostname_conn, $username_conn, $password_conn,$database_conn)or trigger_error(mysqli_error(),E_USER_ERROR);

	if(!$conn){

		

		echo "连接不成功！";	

	}

	$sql = "SELECT *FROM 'text_of_hair_v0.1'";//选定数据表

 	mysqli_query($conn, "set names 'utf8'");

	$result = mysqli_query($conn, $sql);

	class Article{

	

		public $article_title;

		public $article_content;

		public $article_time;

		public $author;

		public $like_num;

		public $anouymous;

		public $article_label;

	

	}

	$data = array();

	if (mysqli_num_rows($result) > 0) {

		while($row = mysqli_fetch_assoc($result)) {

			$article=new Article();

			$article->article_title=$row["article_title"];

			$article->article_content=$row["article_content"];

			$article->article_time=$row["article_time"];

			$article->author=$row["author"];

			$article->like_num=$row["like_num"];

			$article->anouymous=$row["anouymous"];

			$article->article_label=$row["article_label"];

			

			$data[] = $article;

			

			}

			echo json_encode($data,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);//将请求结果转换为json格式

 

			}

　　?>
