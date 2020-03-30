const Post = require('../modules/post');

exports.getPosts = (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  let totalItems;
  Post.find().countDocuments()
    .then(count => {
      totalItems = count;
      return Post.find().skip((currentPage - 1) * perPage).limit(perPage);
    }).then(posts => {
      res.status(200).json({ message: 'Posts fetched successfully', posts, totalItems })
    })
    .catch(err => {
      return res.status(422).json({ message: `couldn't find your posts` });
    });
  
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const reciever = req.body.reciever;
  const content = req.body.content;

  if (title.length < 5 || reciever.length === 0 || content.length === 0) {
    return res.status(422).json({ message: 'Please fill all the missing data' });
  } else {
    const post = new Post({
      creator: {
        name: 'Kyrolos'
      },
      title: title,
      content: content,
      reciever: reciever
    });
    post.save().then(result => {
      console.log(result);
      res.status(201).json({
        message: 'Post created successfully!',
        post: result
      });
    }).catch(err => {
      console.log(err);
    });


    res.status(201).json({
      message: 'Post created successfully!',
      post: {
        _id: new Date().toISOString(),
        creator: {
          name: 'Kyrolos'
        },
        createdAt: new Date(),
        title: title,
        content: content,
        reciever: reciever
      }
    });
  }
};


exports.getPost = (req, res) => {
  const { postId } = req.params;
  Post.findById(postId).then(post => {
    if (!post) {
      return res.status(422).json({ message: `couldn't find the post` })
    }
    res.status(200).json({ message: 'Post Fetched', post: post })
  }).catch(err => console.log(err))
};

exports.updatePost = (req, res) => {
  const { postId } = req.params;
  const { title, reciever, content } = req.body;
  if (title.length < 5 || reciever.length === 0 || content.length === 0) {
    return res.status(422).json({ message: 'Please fill all the missing data' });
  }
  Post.findById(postId).then(post => {
    if (!post) {
      return res.status(422).json({ message: 'Edit failed' })
    }
    post.title = title;
    post.reciever = reciever;
    post.content = content;
    return post.save();
  }).then(result => {
    res.status(200).json({ message: 'Editting done', post: result })
  }).catch(err => console.log(err))
}

exports.deletePost = (req, res) => {
  const { postId } = req.params;
  Post.findById(postId)
    .then(post => {
      if (!post) {
        return res.status(422).json({ message: 'Can not delete that post' })
      }
      Post.findByIdAndRemove(postId)
        .then(result => {
          console.log(result);
          res.status(200).json({ message: 'post deleted succ' })
        })
    })
    .catch(err => console.log(err))
}