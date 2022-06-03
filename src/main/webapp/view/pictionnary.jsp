<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
<head>
<link href='http://fonts.googleapis.com/css?family=Bree+Serif' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Droid+Sans:regular,bold' rel='stylesheet' type='text/css'>
<title>Interactivité HTML5 Canvas</title>
<link rel="stylesheet" href="css/main.css">
<script type="text/javascript" src="js/script.js"></script>
<script type="text/javascript" src="js/jquery.js"></script>
</head>
<body onload="init();">
<div id="drawingcontainer">
    <div class="text">
        Dessinez ci-dessous !
    </div>
    <div id="options">
        <input type="button" value="1px" onclick="changeSize(1);" />
        <input type="button" value="2px" onclick="changeSize(2);" />
        <input type="button" value="3px" onclick="changeSize(3);" />
        <input type="button" value="5px" onclick="changeSize(5);" />
        <input type="button" value="10px" onclick="changeSize(10);" />
        <input type="button" value="15px" onclick="changeSize(20);" />
 
        <input type="button" onclick="changeColor('#871de0');" class="purple" value="" />
        <input type="button" onclick="changeColor('#eb159d');" class="pink" value="" />
        <input type="button" onclick="changeColor('#c92626');" class="red" value="" />
        <input type="button" onclick="changeColor('#db551b');" class="orange" value="" />
        <input type="button" onclick="changeColor('#ddc41e');" class="yellow" value="" />
        <input type="button" onclick="changeColor('#76b80f');" class="green" value="" />
        <input type="button" onclick="changeColor('#1974b4');" class="blue" value="" />
        <input type="button" onclick="changeColor('#000');" class="black" value="" />
        <input type="button" onclick="changeColor('#FFF');" class="white" value="" />
        <button id="btnSend">Send message</button>
    </div>
 
    <canvas width="400" height="320" id="drawing">
    Your browser doesn't support canvas
    </canvas>
</div>
 
</body>
</html>