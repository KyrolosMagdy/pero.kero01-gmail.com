const Post = require("../modules/post");
const User = require("../modules/user");

exports.getPosts = (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  let totalItems;
  Post.find()
    .countDocuments()
    .then(count => {
      totalItems = count;
      return Post.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then(posts => {
      res
        .status(200)
        .json({ message: "Posts fetched successfully", posts, totalItems });
    })
    .catch(err => {
      return res.status(422).json({ message: `couldn't find your posts` });
    });
};

exports.createPost = (req, res, next) => {
  const { title, reciever, content } = req.body;
  let creator;

  if (title.length < 5 || reciever.length === 0 || content.length === 0) {
    return res
      .status(422)
      .json({ message: "Please fill all the missing data" });
  } else {
    console.log("creator", req.userId);
    const post = new Post({
      creator: req.userId,
      title: title,
      content: content,
      reciever: reciever
    });
    post
      .save()
      .then(result => {
        return User.findById(req.userId);
      })
      .then(user => {
        creator = user;
        user.posts.push(post);
        return user.save();
      })
      .then(result => {
        res.status(201).json({
          message: "Post created successfully!",
          post: post,
          creator: { _id: creator._id, name: creator.name }
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
};

exports.getPost = (req, res) => {
  const { postId } = req.params;
  Post.findById(postId)
    .then(post => {
      if (!post) {
        return res.status(422).json({ message: `couldn't find the post` });
      }
      res.status(200).json({ message: "Post Fetched", post: post });
    })
    .catch(err => console.log(err));
};

exports.updatePost = (req, res) => {
  const { postId } = req.params;
  const { title, reciever, content } = req.body;
  if (title.length < 5 || reciever.length === 0 || content.length === 0) {
    return res
      .status(422)
      .json({ message: "Please fill all the missing data" });
  }
  Post.findById(postId)
    .then(post => {
      if (!post || post.creator.toString() !== req.userId) {
        return res.status(422).json({ message: "Edit failed" });
      }
      post.title = title;
      post.reciever = reciever;
      post.content = content;
      return post.save();
    })
    .then(result => {
      res.status(200).json({ message: "Editting done", post: result });
    })
    .catch(err => console.log(err));
};

exports.deletePost = (req, res) => {
  const { postId } = req.params;
  Post.findById(postId)
    .then(post => {
      if (!post || post.creator.toString() !== req.userId) {
        return res.status(422).json({ message: "Can not delete that post" });
      }
      Post.findByIdAndRemove(postId)
        .then(result => {
          return User.findById(req.userId);
        })
        .then(user => {
          user.posts.pull(postId);
          return user.save();
        })
        .then(result => {
          console.log(result);
          res.status(200).json({ message: "post deleted succ" });
        });
    })
    .catch(err => console.log(err));
};
