/**
 * File: app.js
 * Desc: entry point for the mysql-node-blogposts proto app
 */

// import / require key modules
const express = require('express');
const mysql = require('mysql');

// Create DB Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root81#',
  database: 'test_blog',
});
db.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected...');
});

// instantiate an express app
const app = express();

// Route to Create DB
app.get('/createDB', (req, res) => {
  let sql = 'CREATE DATABASE IF NOT EXISTS test_blog';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Database created');
  });
});

// Route to Create Posts Table
app.get('/createPostsTable', (req, res) => {
  let createTableSql =
    'CREATE TABLE IF NOT EXISTS Posts(id int AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), body VARCHAR(255))';
  db.query(createTableSql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Posts table created...');
  });
});

// Route to INSERT Post 1
app.get('/addPostOne', (req, res) => {
  let postOne = { title: 'Post One', body: 'is everybody in...' };
  let addPostOneSql = 'INSERT INTO Posts SET ?';
  let query = db.query(addPostOneSql, postOne, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Post One Data Added...');
  });
});

// Route to INSERT Post 2
app.get('/addPostTwo', (req, res) => {
  let postTwo = { title: 'Post Two', body: 'I am the lizard king' };
  let addPostTwoSql = 'INSERT INTO Posts SET ?';
  let query = db.query(addPostTwoSql, postTwo, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Post Two Data Added...');
  });
});

// Route to SELECT All Posts
app.get('/getPosts', (req, res) => {
  let getPostsSql = 'SELECT * FROM Posts';
  let query = db.query(getPostsSql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send('Posts fetched...');
  });
});

// Route to SELECT a single post
app.get('/getPost/:id', (req, res) => {
  let getPostByIdSql = `SELECT * FROM Posts WHERE id=${req.params.id}`;
  let query = db.query(getPostByIdSql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Post by Id fetched...');
  });
});

// Route to UPDATE Post
app.get('/updatePost/:id', (req, res) => {
  let newTitle = 'My Updated Post';
  let updatePostByIdSql = `UPDATE Posts SET title = '${newTitle}' WHERE id=${req.params.id}`;
  let query = db.query(updatePostByIdSql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Post by Id Updated...');
  });
});

// Route to DELETE Post
app.get('/deletePost/:id', (req, res) => {
  let deletePostByIdSql = `DELETE FROM Posts WHERE id=${req.params.id}`;
  let query = db.query(deletePostByIdSql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Post by Id Deleted...');
  });
});

// create simple web server
const PORT = process.env.port || 5000;
app.listen(PORT, () => {
  console.log(`Server Started and listening on port ${PORT}`);
  console.table(`${JSON.stringify(process.env.USER)}`);
});

// module.exports = app;
