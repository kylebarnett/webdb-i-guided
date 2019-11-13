const express = require('express');

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', (req, res) => {
  db('posts')
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error retrieving posts.' })
    })
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db('posts').where({ id })
    .then(post => {
      if (post[0]) {
        res.status(200).json(post)
      } else {
        res.status(404).json({ message: 'ID not found.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Error retrieving specific ID.' })
    })
});

router.post('/', (req, res) => {
  const postData = req.body;

  db('posts').insert(postData)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error posting info.' })
    })
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const postInfo = req.body;
  db('posts').where({ id }).update(postInfo)
    .then(post => {
      if (post) {
        res.status(200).json(post)
      } else {
        res.status(404).json({ message: 'ID not found.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Error updating post.' })
    })
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db('posts').where({ id }).del()
    .then(post => {
      if (post) {
        res.status(204).json(post)
      } else {
        res.status(404).json({ message: 'ID not found.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Error deleting post.' })
    })
});

module.exports = router;