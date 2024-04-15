exports.GetMyDetails = async (req, res) => {
  res.send(req.user);
};

exports.Logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();

    res.status(200).send();
  } catch (e) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};
