// Create web server
// 1. Import express
// 2. Create an express app
// 3. Create a route for GET /comments
// 4. Create a route for POST /comments
// 5. Create a route for DELETE /comments/:id
// 6. Start the server

// 1. Import express
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// 2. Create an express app
const app = express();

// 3. Create a route for GET /comments
app.get('/comments', (req, res) => {
  fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Server error');
      return;
    }

    res.json(JSON.parse(data));
  });
});

// 4. Create a route for POST /comments
app.use(bodyParser.json());
app.post('/comments', (req, res) => {
  const newComment = req.body;

  fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Server error');
      return;
    }

    const comments = JSON.parse(data);
    comments.push(newComment);

    fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments, null, 2), (err) => {
      if (err) {
        res.status(500).send('Server error');
        return;
      }

      res.status(201).send('Comment added');
    });
  });
});

// 5. Create a route for DELETE /comments/:id
app.delete('/comments/:id', (req, res) => {
  const id = req.params.id;

  fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Server error');
      return;
    }

    const comments = JSON.parse(data);
    const updatedComments = comments.filter((comment) => comment.id !== id);

    fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(updatedComments, null, 2), (err) => {
      if (err) {
        res.status(500).send('Server error');
